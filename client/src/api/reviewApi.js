import api from './axios';

export const getMovieReviews = (tmdbId) => api.get(`/reviews/movie/${tmdbId}`);
export const getMyReviews = () => api.get('/reviews/me');
export const createReview = (data) => api.post('/reviews', data);
export const updateReview = (reviewId, data) => api.patch(`/reviews/${reviewId}`, data);
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);
export const likeReview = (reviewId) => api.post(`/reviews/${reviewId}/like`);
export const reportReview = (reviewId, reason) =>
  api.post(`/reviews/${reviewId}/report`, { reason });
