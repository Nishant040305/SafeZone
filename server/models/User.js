const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const UserSchema = new Schema(
  {
    displayname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: '',
    },

    // Location tracking
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude] - GeoJSON format
        default: [25, 81],
        index: '2dsphere',
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      radius: { type: Number, default: 10 },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Geospatial index on the location field for efficient queries
UserSchema.index({ location: '2dsphere' });

module.exports = model('User', UserSchema);
