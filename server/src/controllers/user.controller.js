import User from "../models//User.js";
import WatchlistItem from "../models//WatchlistItem.js";
import Review from "../models//Review.js";

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -email",
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const reviewCount = await Review.countDocuments({ userId: user._id });
    const watchlistCount = await WatchlistItem.countDocuments({
      userId: user._id,
    });

    const isFollowing = req.user
      ? user.followers.some((id) => id.toString() === req.user._id.toString())
      : false;

    res.json({
      ...user.toPublicJSON(),
      reviewCount,
      watchlistCount,
      isFollowing,
    });
  } catch (err) {
    next(err);
  }
};

const followUser = async (req, res, next) => {
  try {
    const targetId = req.params.userId;
    if (targetId === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: "User not found" });

    const currentUser = await User.findById(req.user._id);
    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetId,
    );

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetId,
      );
      target.followers = target.followers.filter(
        (id) => id.toString() !== currentUser._id.toString(),
      );
    } else {
      currentUser.following.push(targetId);
      target.followers.push(currentUser._id);
    }

    await Promise.all([currentUser.save(), target.save()]);

    res.json({
      following: !isFollowing,
      followersCount: target.followers.length,
    });
  } catch (err) {
    next(err);
  }
};

const getUserWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const items = await WatchlistItem.find({ userId: user._id }).sort({
      updatedAt: -1,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserProfile, followUser, getUserWatchlist };
