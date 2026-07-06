const WatchlistItem = require('../models/WatchlistItem');

const addToWatchlist = async (req, res, next) => {
  try {
    const { tmdbId, title, posterPath, releaseYear, status, notes } = req.body;
    if (!tmdbId || !title) {
      return res.status(400).json({ message: 'tmdbId and title are required' });
    }

    const item = await WatchlistItem.findOneAndUpdate(
      { userId: req.user._id, tmdbId },
      {
        userId: req.user._id,
        tmdbId,
        title,
        posterPath: posterPath || null,
        releaseYear: releaseYear || null,
        status: status || 'plan_to_watch',
        notes: notes || '',
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const getMyWatchlist = async (req, res, next) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const items = await WatchlistItem.find(filter).sort({ updatedAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const updateWatchlistItem = async (req, res, next) => {
  try {
    const { status, personalRating, notes } = req.body;
    const updates = {};

    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (personalRating !== undefined) {
      updates.personalRating = personalRating;
    }
    if (status === 'watched') {
      updates.watchedAt = new Date();
    }

    const item = await WatchlistItem.findOneAndUpdate(
      { userId: req.user._id, tmdbId: req.params.tmdbId },
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};

const removeFromWatchlist = async (req, res, next) => {
  try {
    const item = await WatchlistItem.findOneAndDelete({
      userId: req.user._id,
      tmdbId: req.params.tmdbId,
    });

    if (!item) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }

    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addToWatchlist, getMyWatchlist, updateWatchlistItem, removeFromWatchlist };
