const express = require('express');
const { UserVerifier } = require('../middleware/credMiddleware');
const router = express.Router();
const { ReportController } = require('../controllers');

//@ POST /api/report/postReport
// submit reports
router.post('/postReport', UserVerifier, ReportController.ReportSubmission);

//@ GET /api/report/getReports?page=<PAGE>
// get reports
router.get('/getReports', ReportController.getReports);

//@ GET /api/report/getSingleReport/:id
// get single report
router.get('/getSingleReport/:id', ReportController.getSingleReport);

//@ PATCH /api/report/vote/:id
// update vote
router.patch('/vote/:id', UserVerifier, ReportController.voteUpdate);
module.exports = router;
