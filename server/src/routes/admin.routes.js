const express = require('express');
const { getReports, updateReport, deleteReviewAdmin, getStats } = require('../controllers/admin.controller');
const protect = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

const router = express.Router();

router.use(protect, admin);

router.get('/stats', getStats);
router.get('/reports', getReports);
router.patch('/reports/:reportId', updateReport);
router.delete('/reviews/:reviewId', deleteReviewAdmin);

module.exports = router;
