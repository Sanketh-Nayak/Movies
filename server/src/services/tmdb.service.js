import axios from "axios";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: process.env.TMDB_API_KEY },
});

const posterUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;
const backdropUrl = (path, size = "w1280") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

const formatMovieSummary = (movie) => ({
  tmdbId: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  posterUrl: posterUrl(movie.poster_path),
  backdropUrl: backdropUrl(movie.backdrop_path),
  releaseDate: movie.release_date,
  releaseYear: movie.release_date
    ? parseInt(movie.release_date.slice(0, 4), 10)
    : null,
  voteAverage: movie.vote_average,
  genreIds: movie.genre_ids || movie.genres?.map((g) => g.id) || [],
  genres: movie.genres?.map((g) => g.name) || [],
});

const formatMovieDetails = (movie, credits, videos) => {
  const director = credits?.crew?.find((c) => c.job === "Director");
  const trailer = videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );

  return {
    tmdbId: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    posterUrl: posterUrl(movie.poster_path),
    backdropUrl: backdropUrl(movie.backdrop_path),
    releaseDate: movie.release_date,
    releaseYear: movie.release_date
      ? parseInt(movie.release_date.slice(0, 4), 10)
      : null,
    runtime: movie.runtime,
    genres: movie.genres?.map((g) => ({ id: g.id, name: g.name })) || [],
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    director: director ? { id: director.id, name: director.name } : null,
    cast:
      credits?.cast?.slice(0, 15).map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profilePath: c.profile_path,
        profileUrl: posterUrl(c.profile_path, "w185"),
      })) || [],
    trailer: trailer
      ? {
          key: trailer.key,
          name: trailer.name,
          url: `https://www.youtube.com/watch?v=${trailer.key}`,
        }
      : null,
  };
};

const searchMovies = async (query, page = 1) => {
  const { data } = await tmdb.get("/search/movie", { params: { query, page } });
  return {
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(formatMovieSummary),
  };
};

const getPopular = async (page = 1) => {
  const { data } = await tmdb.get("/movie/popular", { params: { page } });
  return {
    page: data.page,
    totalPages: data.total_pages,
    results: data.results.map(formatMovieSummary),
  };
};

const getTopRated = async (page = 1) => {
  const { data } = await tmdb.get("/movie/top_rated", { params: { page } });
  return {
    page: data.page,
    totalPages: data.total_pages,
    results: data.results.map(formatMovieSummary),
  };
};

const getUpcoming = async (page = 1) => {
  const { data } = await tmdb.get("/movie/upcoming", { params: { page } });
  return {
    page: data.page,
    totalPages: data.total_pages,
    results: data.results.map(formatMovieSummary),
  };
};

const getByGenre = async (genreId, page = 1) => {
  const { data } = await tmdb.get("/discover/movie", {
    params: { with_genres: genreId, page, sort_by: "popularity.desc" },
  });
  return {
    page: data.page,
    totalPages: data.total_pages,
    results: data.results.map(formatMovieSummary),
  };
};

const getMovieDetails = async (tmdbId) => {
  const [movieRes, creditsRes, videosRes] = await Promise.all([
    tmdb.get(`/movie/${tmdbId}`),
    tmdb.get(`/movie/${tmdbId}/credits`),
    tmdb.get(`/movie/${tmdbId}/videos`),
  ]);
  return formatMovieDetails(movieRes.data, creditsRes.data, videosRes.data);
};

const getTrailer = async (tmdbId) => {
  const { data } = await tmdb.get(`/movie/${tmdbId}/videos`);
  const trailer = data.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );
  return trailer
    ? {
        key: trailer.key,
        name: trailer.name,
        url: `https://www.youtube.com/watch?v=${trailer.key}`,
      }
    : null;
};

const getGenres = async () => {
  const { data } = await tmdb.get("/genre/movie/list");
  return data.genres;
};

module.exports = {
  searchMovies,
  getPopular,
  getTopRated,
  getUpcoming,
  getByGenre,
  getMovieDetails,
  getTrailer,
  getGenres,
  formatMovieSummary,
};
