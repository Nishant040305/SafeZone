const { Schema, model } = require('mongoose');

// Define the Report schema
const ReportSchema = new Schema(
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
      required: true,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    media: {
      type: [String],
      default: [],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    upvotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      default: 'pending',
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Report', ReportSchema);
