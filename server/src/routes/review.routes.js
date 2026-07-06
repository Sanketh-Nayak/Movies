const express = require('express');
const {
  createReview,
  getMovieReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  likeReview,
  reportReview,
} = require('../controllers/review.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/movie/:tmdbId', getMovieReviews);
router.get('/me', protect, getMyReviews);
router.post('/', protect, createReview);
router.patch('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);
router.post('/:reviewId/like', protect, likeReview);
router.post('/:reviewId/report', protect, reportReview);

module.exports = router;
