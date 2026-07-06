import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import * as watchlistApi from '../api/watchlistApi';

const TABS = [
  { value: '', label: 'All' },
  { value: 'plan_to_watch', label: 'Plan to Watch' },
  { value: 'watching', label: 'Watching' },
  { value: 'watched', label: 'Watched' },
];

export default function Watchlist() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    watchlistApi.getMyWatchlist(status || undefined)
      .then(({ data }) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status]);

  return (
    <div className="page container">
      <h1>My Watchlist</h1>
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`tabs__btn ${status === tab.value ? 'tabs__btn--active' : ''}`}
            onClick={() => setStatus(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <p className="empty-state">Your watchlist is empty. <Link to="/search">Find movies</Link></p>
      ) : (
        <div className="watchlist-grid">
          {items.map((item) => (
            <Link key={item._id} to={`/movies/${item.tmdbId}`} className="watchlist-item">
              <img
                src={item.posterPath ? `https://image.tmdb.org/t/p/w300${item.posterPath}` : 'https://via.placeholder.com/300x450/1a1a2e/eee?text=No+Poster'}
                alt={item.title}
                className="watchlist-item__poster"
              />
              <div className="watchlist-item__info">
                <h3>{item.title}</h3>
                <span className={`status-badge status-badge--${item.status}`}>
                  {item.status.replace(/_/g, ' ')}
                </span>
                {item.personalRating && <span>★ {item.personalRating}/10</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
