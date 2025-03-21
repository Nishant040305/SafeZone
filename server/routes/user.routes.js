const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const { UserVerifier } = require('../middleware/credMiddleware');

// Protected routes (require authentication)
router.put('/location', UserVerifier, UserController.updateLocation);
router.put(
  '/notification-preferences',
  UserVerifier,
  UserController.updateNotificationPreferences
);

module.exports = router;
