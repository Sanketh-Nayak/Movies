import api from './axios';

export const getMyWatchlist = (status) =>
  api.get('/watchlist/me', { params: status ? { status } : {} });

export const addToWatchlist = (data) => api.post('/watchlist', data);
export const updateWatchlistItem = (tmdbId, data) => api.patch(`/watchlist/${tmdbId}`, data);
export const removeFromWatchlist = (tmdbId) => api.delete(`/watchlist/${tmdbId}`);
