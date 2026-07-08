import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tmdbId: { type: Number, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    content: { type: String, required: true, maxlength: 5000 },
    containsSpoiler: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

reviewSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
