export default function MovieDetailsHeader({ movie, userRating, watchlistControls }) {
  return (
    <header
      className="movie-header"
      style={movie.backdropUrl ? { backgroundImage: `url(${movie.backdropUrl})` } : undefined}
    >
      <div className="movie-header__overlay">
        <div className="container movie-header__content">
          <img
            src={movie.posterUrl || 'https://via.placeholder.com/300x450/1a1a2e/eee?text=No+Poster'}
            alt={movie.title}
            className="movie-header__poster"
          />
          <div className="movie-header__info">
            <h1>{movie.title}</h1>
            <div className="movie-header__meta">
              {movie.releaseDate && <span>{movie.releaseDate}</span>}
              {movie.runtime && <span>{movie.runtime} min</span>}
              {movie.director && <span>Dir. {movie.director.name}</span>}
            </div>
            <div className="movie-header__genres">
              {movie.genres?.map((g) => (
                <span key={g.id} className="badge">{g.name}</span>
              ))}
            </div>
            <div className="movie-header__ratings">
              <span className="rating-badge">TMDB ★ {movie.voteAverage?.toFixed(1)}</span>
              {userRating?.averageRating != null && (
                <span className="rating-badge rating-badge--user">
                  Users ★ {userRating.averageRating} ({userRating.count})
                </span>
              )}
            </div>
            <p className="movie-header__overview">{movie.overview}</p>
            {watchlistControls}
          </div>
        </div>
      </div>
    </header>
  );
}
