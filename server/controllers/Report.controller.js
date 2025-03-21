const Report = require('../models/Report');
const mongoose = require('mongoose');
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
const getSingleReport = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid report ID' });
    }
    const report = await Report.findById(req.params.id);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
};
const voteUpdate = async (req, res) => {
  try {
    const { _id } = req.user;
    const { type } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    const hasUpvoted = report.upvotedBy.includes(_id);
    const hasDownvoted = report.downvotedBy.includes(_id);

    if (type === 'upvote') {
      if (hasUpvoted) {
        report.upvotes -= 1;
        report.upvotedBy.pull(_id);
      } else {
        report.upvotes += 1;
        report.upvotedBy.push(_id);
        if (hasDownvoted) {
          report.downvotes -= 1;
          report.downvotedBy.pull(_id);
        }
      }
    } else if (type === 'downvote') {
      if (hasDownvoted) {
        report.downvotes -= 1;
        report.downvotedBy.pull(_id);
      } else {
        report.downvotes += 1;
        report.downvotedBy.push(_id);
        if (hasUpvoted) {
          report.upvotes -= 1;
          report.upvotedBy.pull(_id);
        }
      }
    }

    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { ReportSubmission, getReports, getSingleReport, voteUpdate };
