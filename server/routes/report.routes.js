const express = require('express');
const { UserVerifier } = require('../middleware/credMiddleware');
const router = express.Router();
const {
  ReportSubmission,
  getReports,
} = require('../controllers/Report.controller');

//@ POST /api/report/postReport
// submit reports
router.post('/postReport', UserVerifier, ReportSubmission);

//@ GET /api/report/getReports?page=<PAGE>
// get reports
router.get('/getReports', getReports);
module.exports = router;
