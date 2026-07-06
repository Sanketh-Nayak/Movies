import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import * as userApi from '../api/userApi';

export default function UserProfile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      userApi.getUserProfile(userId),
      userApi.getUserWatchlist(userId),
    ])
      .then(([profileRes, watchlistRes]) => {
        setProfile(profileRes.data);
        setWatchlist(watchlistRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleFollow = async () => {
    const { data } = await userApi.followUser(userId);
    setProfile((prev) => ({
      ...prev,
      isFollowing: data.following,
      followersCount: data.followersCount,
    }));
  };

  if (loading) return <Spinner fullPage />;
  if (!profile) return <div className="container"><p>User not found.</p></div>;

  const isSelf = currentUser?._id === userId;

  return (
    <div className="page container">
      <div className="profile-header">
        <div className="profile-header__avatar">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>{profile.name}</h1>
          {profile.bio && <p>{profile.bio}</p>}
          <div className="profile-stats">
            <span>{profile.followersCount} followers</span>
            <span>{profile.followingCount} following</span>
            <span>{profile.reviewCount} reviews</span>
            <span>{profile.watchlistCount} watchlist items</span>
          </div>
          {!isSelf && currentUser && (
            <button type="button" className="btn btn--primary btn--sm" onClick={handleFollow}>
              {profile.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      <section>
        <h2>Public Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="empty-state">No public watchlist items.</p>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((item) => (
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
