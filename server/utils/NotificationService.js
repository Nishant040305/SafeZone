const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class NotificationService {
  /**
   * Find users within a specified radius of a location
   * @param {Object} location - {latitude, longitude}
   * @param {Number} radiusKm - Radius in kilometers
   * @returns {Promise<Array>} - Array of users within the radius
   */
  async findNearbyUsers(location, radiusKm = 10) {
    try {
      // Convert kilometers to radians (Earth's radius is approx. 6371 km)
      const radiusInRadians = radiusKm / 6371;

      // Find users within the radius using MongoDB's $geoWithin operator
      const nearbyUsers = await User.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(location.longitude), parseFloat(location.latitude)],
              radiusInRadians,
            ],
          },
        },
      });

      return nearbyUsers;
    } catch (error) {
      console.error('Error finding nearby users:', error);
      return [];
    }
  }

  /**
   * Send email notification to a user
   * @param {Object} user - User object with email
   * @param {Object} report - Report object
   */
  async sendEmailNotification(user, report) {
    if (!user.email || !user.notificationPreferences.email) return;

    try {
      const emailContent = this._createEmailContent(user, report);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `SafeZone Alert: ${report.category} incident reported nearby`,
        html: emailContent,
      });

      console.log(`Email notification sent to ${user.email}`);
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  }

  /**
   * Send SMS notification (implementation depends on your SMS provider)
   * @param {Object} user - User object with phone
   * @param {Object} report - Report object
   */
  async sendSMSNotification(user, report) {
    if (!user.phone || !user.notificationPreferences.sms) return;

    try {
      const message = this._createSMSContent(report);

      // Implement SMS provider integration here (Twilio, AWS SNS, etc.)
      console.log(
        `SMS notification would be sent to ${user.phone}: ${message}`
      );
    } catch (error) {
      console.error('Error sending SMS notification:', error);
    }
  }

  /**
   * Send push notification via Socket.io
   * @param {Object} io - Socket.io instance
   * @param {Object} user - User object
   * @param {Object} report - Report object
   */
  sendPushNotification(io, user, report) {
    if (!user.notificationPreferences.push) return;

    try {
      const notification = {
        type: 'nearby_report',
        title: `SafeZone Alert: ${report.category}`,
        message: report.title,
        reportId: report._id,
        timestamp: new Date(),
      };

      // Emit to the user's room (assuming users join a room with their ID when connected)
      io.to(user._id.toString()).emit('notification', notification);

      console.log(`Push notification sent to user ${user._id}`);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  /**
   * Notify all users near a report
   * @param {Object} io - Socket.io instance
   * @param {Object} report - Report object
   */
  async notifyNearbyUsers(io, report) {
    try {
      // Find users within their preferred notification radius
      const nearbyUsers = await this.findNearbyUsers(report.location);

      // Skip if no nearby users found
      if (nearbyUsers.length === 0) {
        console.log('No users found near the report location');
        return;
      }

      // Send notifications to each nearby user based on their preferences
      for (const user of nearbyUsers) {
        // Skip notification for the user who created the report
        if (user._id.toString() === report.ReporterId.toString()) {
          continue;
        }

        // Send notifications according to user preferences
        await this.sendEmailNotification(user, report);
        await this.sendSMSNotification(user, report);
        this.sendPushNotification(io, user, report);
      }

      console.log(`Notifications sent to ${nearbyUsers.length} nearby users`);
    } catch (error) {
      console.error('Error notifying nearby users:', error);
    }
  }

  /**
   * Create HTML content for email notification
   * @private
   */
  _createEmailContent(user, report) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #d32f2f;">⚠️ SafeZone Alert</h2>
        <p>Hello ${user.displayname},</p>
        <p>A ${report.category} incident has been reported near your location:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0;">${report.title}</h3>
          <p>${report.description}</p>
          <p style="font-size: 0.9em; color: #757575;">📍 Location: ${report.location.latitude}, ${report.location.longitude}</p>
          <p style="font-size: 0.9em; color: #757575;">⏱️ Reported at: ${new Date(report.createdAt).toLocaleString()}</p>
        </div>
        <p>Please take necessary precautions and stay safe.</p>
        <a href="${process.env.CLIENT}/report/${report._id}" style="display: inline-block; background-color: #2196f3; color: white; text-decoration: none; padding: 10px 15px; border-radius: 4px; margin-top: 10px;">View Full Report</a>
        <p style="font-size: 0.8em; color: #9e9e9e; margin-top: 20px;">
          You received this notification because you enabled email alerts for incidents near your location. 
          To update your notification preferences, visit <a href="${process.env.CLIENT}/profile/settings">your settings</a>.
        </p>
      </div>
    `;
  }

  /**
   * Create content for SMS notification
   * @private
   */
  _createSMSContent(report) {
    return `SafeZone Alert: ${report.category} - ${report.title} reported near you. Check SafeZone app for details.`;
  }
}

module.exports = new NotificationService();
