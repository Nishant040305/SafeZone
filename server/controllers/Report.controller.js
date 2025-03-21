const Report = require('../models/Report');
const NotificationService = require('../utils/NotificationService');

const ReportSubmission = async (req, res) => {
  const { title, description, latitude, longitude, media, category } = req.body;

  console.log(title, description, latitude, longitude, media, category);

  const reporterId = req.user?._id;
  if (!reporterId) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Reporter ID missing' });
  }

  // Create a new report instance, aligning with the schema
  const report = new Report({
    ReporterId: reporterId,
    title,
    description,
    location: {
      latitude,
      longitude,
    },
    media,
    category,
  });

  try {
    const savedReport = await report.save();

    // Get Socket.io instance from app
    const io = req.app.get('io');

    // Trigger notifications in the background (non-blocking)
    NotificationService.notifyNearbyUsers(io, savedReport).catch((err) =>
      console.error('Error sending notifications:', err)
    );

    res.status(201).json(savedReport);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error saving report', error: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    let { page = 1 } = req.query;
    page = parseInt(page);
    limit = 20;

    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalReports = await Report.countDocuments();
    const hasMore = page * limit < totalReports;

    res.status(200).json({ reports, hasMore, page });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};

module.exports = { ReportSubmission, getReports };
