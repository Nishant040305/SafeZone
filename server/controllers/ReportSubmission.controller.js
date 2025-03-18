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

module.exports = { ReportSubmission };
