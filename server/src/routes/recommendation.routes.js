const express = require('express');
const { getRecommendations } = require('../controllers/recommendation.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/me', protect, getRecommendations);

module.exports = router;
