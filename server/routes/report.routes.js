const express = require('express');
const router = express.Router();
const {
  ReportSubmission,
  getReports,
} = require('../controllers/Report.controller');

//@ POST /api/report/postReport
// submit reports
router.post('/postReport', ReportSubmission);

//@ GET /api/report/getReports?page=<PAGE>
// get reports
router.get('/getReports', getReports);
module.exports = router;
