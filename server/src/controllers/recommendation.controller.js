import WatchlistItem from "../models/WatchlistItem.js";
import tmdb from "../services/tmdb.service.js";

const getRecommendations = async (req, res, next) => {
  try {
    const watchedItems = await WatchlistItem.find({
      userId: req.user._id,
      status: "watched",
    });

    const ratedItems = await WatchlistItem.find({
      userId: req.user._id,
      personalRating: { $gte: 7 },
    });

    const allItems = [...watchedItems, ...ratedItems];
    const genreCounts = {};

    for (const item of allItems) {
      try {
        const details = await tmdb.getMovieDetails(item.tmdbId);
        for (const genre of details.genres || []) {
          genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1;
        }
      } catch {
        // skip movies TMDB can't fetch
      }
    }

    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id);

    if (topGenres.length === 0) {
      const popular = await tmdb.getPopular(1);
      return res.json({
        message: "Watch and rate movies to get personalized recommendations",
        recommendations: popular.results.slice(0, 12),
      });
    }

    const watchlistIds = new Set(
      (await WatchlistItem.find({ userId: req.user._id })).map((i) => i.tmdbId),
    );

    const seen = new Set();
    const recommendations = [];

    for (const genreId of topGenres) {
      const data = await tmdb.getByGenre(genreId, 1);
      for (const movie of data.results) {
        if (!watchlistIds.has(movie.tmdbId) && !seen.has(movie.tmdbId)) {
          seen.add(movie.tmdbId);
          recommendations.push(movie);
        }
      }
    }

    res.json({
      topGenres: topGenres.map(Number),
      recommendations: recommendations.slice(0, 20),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecommendations };
