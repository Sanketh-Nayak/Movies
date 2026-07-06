import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://via.placeholder.com/300x450/1a1a2e/eee?text=No+Poster';

export default function MovieCard({ movie }) {
  const poster = movie.posterUrl || (movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : PLACEHOLDER);

  return (
    <Link to={`/movies/${movie.tmdbId}`} className="movie-card">
      <div className="movie-card__poster-wrap">
        <img src={poster} alt={movie.title} className="movie-card__poster" loading="lazy" />
        {movie.voteAverage != null && (
          <span className="movie-card__rating">★ {movie.voteAverage.toFixed(1)}</span>
        )}
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        {movie.releaseYear && <p className="movie-card__year">{movie.releaseYear}</p>}
      </div>
    </Link>
  );
}
