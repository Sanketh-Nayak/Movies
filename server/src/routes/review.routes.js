import express from "express";
import {
  createReview,
  getMovieReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  likeReview,
  reportReview,
} from "../controllers/review.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/movie/:tmdbId", getMovieReviews);
router.get("/me", protect, getMyReviews);
router.post("/", protect, createReview);
router.patch("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);
router.post("/:reviewId/like", protect, likeReview);
router.post("/:reviewId/report", protect, reportReview);

module.exports = router;
