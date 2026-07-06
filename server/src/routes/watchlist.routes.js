const express = require('express');
const {
  addToWatchlist,
  getMyWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} = require('../controllers/watchlist.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/', addToWatchlist);
router.get('/me', getMyWatchlist);
router.patch('/:tmdbId', updateWatchlistItem);
router.delete('/:tmdbId', removeFromWatchlist);

module.exports = router;
