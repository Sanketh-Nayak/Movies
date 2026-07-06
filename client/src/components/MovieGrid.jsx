import MovieCard from './MovieCard';
import Spinner from './Spinner';

export default function MovieGrid({ movies, loading }) {
  if (loading) return <Spinner />;

  if (!movies?.length) {
    return <p className="empty-state">No movies found.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.tmdbId} movie={movie} />
      ))}
    </div>
  );
}
