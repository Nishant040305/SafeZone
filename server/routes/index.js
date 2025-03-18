const express = require('express');
const router = express.Router();

const credentialRoutes = require('./credential.routes');
const reportRoutes = require('./report.routes');
const mediaRoutes = require('./media.routes');
router.use('/auth', credentialRoutes);
router.use('/report', reportRoutes);
router.use('/media', mediaRoutes);
module.exports = router;
