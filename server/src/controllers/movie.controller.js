import tmdb from "../services/tmdb.service.js";

const search = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query?.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const data = await tmdb.searchMovies(query.trim(), parseInt(page, 10));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const popular = async (req, res, next) => {
  try {
    const data = await tmdb.getPopular(parseInt(req.query.page, 10) || 1);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const topRated = async (req, res, next) => {
  try {
    const data = await tmdb.getTopRated(parseInt(req.query.page, 10) || 1);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const upcoming = async (req, res, next) => {
  try {
    const data = await tmdb.getUpcoming(parseInt(req.query.page, 10) || 1);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const byGenre = async (req, res, next) => {
  try {
    const data = await tmdb.getByGenre(
      req.params.genreId,
      parseInt(req.query.page, 10) || 1,
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const genres = async (req, res, next) => {
  try {
    const data = await tmdb.getGenres();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const details = async (req, res, next) => {
  try {
    const data = await tmdb.getMovieDetails(req.params.tmdbId);
    res.json(data);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ message: "Movie not found" });
    }
    next(err);
  }
};

const trailer = async (req, res, next) => {
  try {
    const data = await tmdb.getTrailer(req.params.tmdbId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  search,
  popular,
  topRated,
  upcoming,
  byGenre,
  genres,
  details,
  trailer,
};
