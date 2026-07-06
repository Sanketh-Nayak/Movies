const express = require('express');
const { getUserProfile, followUser, getUserWatchlist } = require('../controllers/user.controller');
const protect = require('../middleware/auth.middleware');
const optionalAuth = require('../middleware/optionalAuth.middleware');

const router = express.Router();

router.get('/:userId', optionalAuth, getUserProfile);
router.post('/:userId/follow', protect, followUser);
router.get('/:userId/watchlist', getUserWatchlist);

module.exports = router;
