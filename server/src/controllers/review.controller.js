const Review = require('../models/Review');
const Report = require('../models/Report');

const createReview = async (req, res, next) => {
  try {
    const { tmdbId, title, rating, content, containsSpoiler } = req.body;
    if (!tmdbId || !title || !rating || !content?.trim()) {
      return res.status(400).json({ message: 'tmdbId, title, rating, and content are required' });
    }

    const review = await Review.create({
      userId: req.user._id,
      tmdbId,
      title,
      rating,
      content: content.trim(),
      containsSpoiler: containsSpoiler || false,
    });

    await review.populate('userId', 'name avatar');
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

const getMovieReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ tmdbId: req.params.tmdbId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });

    const stats = await Review.aggregate([
      { $match: { tmdbId: parseInt(req.params.tmdbId, 10) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      reviews,
      stats: stats[0]
        ? { averageRating: Math.round(stats[0].averageRating * 10) / 10, count: stats[0].count }
        : { averageRating: null, count: 0 },
    });
  } catch (err) {
    next(err);
  }
};

const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { rating, content, containsSpoiler } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (content !== undefined) review.content = content;
    if (containsSpoiler !== undefined) review.containsSpoiler = containsSpoiler;

    await review.save();
    await review.populate('userId', 'name avatar');
    res.json(review);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const isOwner = review.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Report.deleteMany({ reviewId: review._id });
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};

const likeReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const userId = req.user._id;
    const liked = review.likes.some((id) => id.toString() === userId.toString());

    if (liked) {
      review.likes = review.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      review.likes.push(userId);
    }

    await review.save();
    res.json({ likesCount: review.likes.length, liked: !liked });
  } catch (err) {
    next(err);
  }
};

const reportReview = async (req, res, next) => {
  try {
    const { reason } = req.body;
    if (!reason?.trim()) {
      return res.status(400).json({ message: 'Reason is required' });
    }

    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const report = await Report.create({
      reporterId: req.user._id,
      reviewId: review._id,
      reason: reason.trim(),
    });

    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getMovieReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  likeReview,
  reportReview,
};
