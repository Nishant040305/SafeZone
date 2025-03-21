const User = require('../models/User');

// Update user location
const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: 'Latitude and longitude are required' });
    }

    // Update user location in GeoJSON format
    await User.findByIdAndUpdate(req.user._id, {
      'location.coordinates': [parseFloat(longitude), parseFloat(latitude)],
      'location.lastUpdated': new Date(),
    });

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Error updating location:', error);
    res
      .status(500)
      .json({ message: 'Error updating location', error: error.message });
  }
};

// Update notification preferences
const updateNotificationPreferences = async (req, res) => {
  try {
    const { email, sms, push, radius } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      'notificationPreferences.email': email,
      'notificationPreferences.sms': sms,
      'notificationPreferences.push': push,
      'notificationPreferences.radius': radius,
    });

    res
      .status(200)
      .json({ message: 'Notification preferences updated successfully' });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    res
      .status(500)
      .json({
        message: 'Error updating notification preferences',
        error: error.message,
      });
  }
};

module.exports = {
  updateLocation,
  updateNotificationPreferences,
};
