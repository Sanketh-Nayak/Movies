import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          🎬 CineTrack
        </Link>

        <div className="navbar__links">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          {user && (
            <>
              <Link to="/watchlist">Watchlist</Link>
              <Link to="/reviews">My Reviews</Link>
              <Link to="/recommendations">For You</Link>
            </>
          )}
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>

        <div className="navbar__actions">
          <button type="button" className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? '☀️' : '🌙'}
          </button>
          {user ? (
            <>
              <Link to={`/users/${user._id}`} className="navbar__user">
                {user.name}
              </Link>
              <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">Login</Link>
              <Link to="/register" className="btn btn--primary btn--sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
