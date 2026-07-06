const Report = require('../models/Report');
const Review = require('../models/Review');
const User = require('../models/User');
const WatchlistItem = require('../models/WatchlistItem');

const getReports = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const reports = await Report.find(filter)
      .populate('reporterId', 'name email')
      .populate({
        path: 'reviewId',
        populate: { path: 'userId', select: 'name email' },
      })
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    next(err);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.reportId,
      { status: req.body.status || 'resolved' },
      { new: true }
    );

    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    next(err);
  }
};

const deleteReviewAdmin = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await Report.deleteMany({ reviewId: review._id });
    await review.deleteOne();
    res.json({ message: 'Review removed by admin' });
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [users, reviews, watchlistItems, pendingReports] = await Promise.all([
      User.countDocuments(),
      Review.countDocuments(),
      WatchlistItem.countDocuments(),
      Report.countDocuments({ status: 'pending' }),
    ]);

    res.json({ users, reviews, watchlistItems, pendingReports });
  } catch (err) {
    next(err);
  }
};

module.exports = { getReports, updateReport, deleteReviewAdmin, getStats };
