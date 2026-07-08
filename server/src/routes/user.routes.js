import express from "express";
import {
  getUserProfile,
  followUser,
  getUserWatchlist,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
import optionalAuth from "../middleware/optionalAuth.middleware.js";

const router = express.Router();

router.get("/:userId", optionalAuth, getUserProfile);
router.post("/:userId/follow", protect, followUser);
router.get("/:userId/watchlist", getUserWatchlist);

module.exports = router;
