const Report = require('../models/Report');
const ReportSubmission = async (req, res) => {
  const { title, description, latitude, longitude, media, category } = req.body;
  const report = new Report({
    title,
    description,
    latitude,
    longitude,
    media,
    category,
  });
  try {
    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error saving report', error });
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
