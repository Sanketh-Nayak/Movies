import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as watchlistApi from '../api/watchlistApi';

const STATUSES = [
  { value: 'plan_to_watch', label: 'Plan to Watch' },
  { value: 'watching', label: 'Watching' },
  { value: 'watched', label: 'Watched' },
];

export default function WatchlistButton({ movie, watchlistItem, onUpdate }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleAdd = async () => {
    setLoading(true);
    try {
      const { data } = await watchlistApi.addToWatchlist({
        tmdbId: movie.tmdbId,
        title: movie.title,
        posterPath: movie.posterPath,
        releaseYear: movie.releaseYear,
      });
      onUpdate?.(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to watchlist');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    setLoading(true);
    try {
      const { data } = await watchlistApi.updateWatchlistItem(movie.tmdbId, { status });
      onUpdate?.(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm('Remove from watchlist?')) return;
    setLoading(true);
    try {
      await watchlistApi.removeFromWatchlist(movie.tmdbId);
      onUpdate?.(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove');
    } finally {
      setLoading(false);
    }
  };

  if (!watchlistItem) {
    return (
      <button type="button" className="btn btn--primary" onClick={handleAdd} disabled={loading}>
        + Add to Watchlist
      </button>
    );
  }

  return (
    <div className="watchlist-controls">
      <select
        value={watchlistItem.status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className="select"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <button type="button" className="btn btn--danger btn--sm" onClick={handleRemove} disabled={loading}>
        Remove
      </button>
    </div>
  );
}
