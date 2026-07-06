import api from './axios';

export const searchMovies = (query, page = 1) =>
  api.get('/movies/search', { params: { query, page } });

export const getPopular = (page = 1) => api.get('/movies/popular', { params: { page } });
export const getTopRated = (page = 1) => api.get('/movies/top-rated', { params: { page } });
export const getUpcoming = (page = 1) => api.get('/movies/upcoming', { params: { page } });
export const getGenres = () => api.get('/movies/genres');
export const getByGenre = (genreId, page = 1) =>
  api.get(`/movies/genre/${genreId}`, { params: { page } });
export const getMovieDetails = (tmdbId) => api.get(`/movies/${tmdbId}`);
export const getTrailer = (tmdbId) => api.get(`/movies/${tmdbId}/trailer`);
