const express = require('express');
const router = express.Router();

const credentialRoutes = require('./credential.routes');

router.use('/auth', credentialRoutes);
module.exports = router;
