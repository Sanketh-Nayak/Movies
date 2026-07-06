import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import * as userApi from '../api/userApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    Promise.all([
      userApi.getAdminStats(),
      userApi.getReports('pending'),
    ])
      .then(([statsRes, reportsRes]) => {
        setStats(statsRes.data);
        setReports(reportsRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const handleResolve = async (reportId) => {
    await userApi.updateReport(reportId, 'resolved');
    loadData();
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Delete this review permanently?')) return;
    await userApi.deleteReviewAdmin(reviewId);
    loadData();
  };

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page container">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-card__value">{stats?.users}</span>
          <span className="stat-card__label">Users</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{stats?.reviews}</span>
          <span className="stat-card__label">Reviews</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{stats?.watchlistItems}</span>
          <span className="stat-card__label">Watchlist Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{stats?.pendingReports}</span>
          <span className="stat-card__label">Pending Reports</span>
        </div>
      </div>

      <section className="section">
        <h2>Pending Reports</h2>
        {reports.length === 0 ? (
          <p className="empty-state">No pending reports.</p>
        ) : (
          <div className="admin-reports">
            {reports.map((report) => (
              <div key={report._id} className="admin-report">
                <p><strong>Reason:</strong> {report.reason}</p>
                <p><strong>Reporter:</strong> {report.reporterId?.name}</p>
                {report.reviewId && (
                  <>
                    <p><strong>Review by:</strong> {report.reviewId.userId?.name}</p>
                    <p className="admin-report__content">{report.reviewId.content}</p>
                    <div className="admin-report__actions">
                      <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDeleteReview(report.reviewId._id)}>
                        Delete Review
                      </button>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => handleResolve(report._id)}>
                        Mark Resolved
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
