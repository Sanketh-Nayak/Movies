import express from "express";

import {
  getReports,
  updateReport,
  deleteReviewAdmin,
  getStats,
} from "../controllers/admin.controlle.js";
import protect from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(protect, admin);

router.get("/stats", getStats);
router.get("/reports", getReports);
router.patch("/reports/:reportId", updateReport);
router.delete("/reviews/:reviewId", deleteReviewAdmin);

module.exports = router;
