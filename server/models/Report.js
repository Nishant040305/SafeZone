const { Schema, model } = require('mongoose');
// Define the User schema
const UserSchema = new Schema(
  {
    ReporterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      requried: true,
    },
    location: {
      type: {
        latitute: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'pending',
    },
    meta: {
      type: Object,
      default: {},
    },
    Time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = model('User', UserSchema);
