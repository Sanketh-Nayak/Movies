import api from './axios';

export const getUserProfile = (userId) => api.get(`/users/${userId}`);
export const followUser = (userId) => api.post(`/users/${userId}/follow`);
export const getUserWatchlist = (userId) => api.get(`/users/${userId}/watchlist`);
export const getRecommendations = () => api.get('/recommendations/me');
export const getAdminStats = () => api.get('/admin/stats');
export const getReports = (status) =>
  api.get('/admin/reports', { params: status ? { status } : {} });
export const updateReport = (reportId, status) =>
  api.patch(`/admin/reports/${reportId}`, { status });
export const deleteReviewAdmin = (reviewId) => api.delete(`/admin/reviews/${reviewId}`);
