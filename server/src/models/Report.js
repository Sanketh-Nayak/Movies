const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
    reason: { type: String, required: true, maxlength: 500 },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
