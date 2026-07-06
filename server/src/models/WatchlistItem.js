const mongoose = require('mongoose');

const watchlistItemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tmdbId: { type: Number, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, default: null },
    releaseYear: { type: Number },
    status: {
      type: String,
      enum: ['plan_to_watch', 'watching', 'watched'],
      default: 'plan_to_watch',
    },
    personalRating: { type: Number, min: 1, max: 10, default: null },
    notes: { type: String, default: '', maxlength: 1000 },
    watchedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

watchlistItemSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model('WatchlistItem', watchlistItemSchema);
