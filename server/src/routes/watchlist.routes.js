import express from "express";
import {
  addToWatchlist,
  getMyWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} from "../controllers/watchlist.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addToWatchlist);
router.get("/me", getMyWatchlist);
router.patch("/:tmdbId", updateWatchlistItem);
router.delete("/:tmdbId", removeFromWatchlist);

module.exports = router;
