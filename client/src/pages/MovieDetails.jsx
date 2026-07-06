import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieDetailsHeader from '../components/MovieDetailsHeader';
import CastList from '../components/CastList';
import TrailerModal from '../components/TrailerModal';
import WatchlistButton from '../components/WatchlistButton';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import RatingInput from '../components/RatingInput';
import Spinner from '../components/Spinner';
import * as movieApi from '../api/movieApi';
import * as watchlistApi from '../api/watchlistApi';
import * as reviewApi from '../api/reviewApi';

export default function MovieDetails() {
  const { tmdbId } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [watchlistItem, setWatchlistItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [personalRating, setPersonalRating] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      movieApi.getMovieDetails(tmdbId),
      reviewApi.getMovieReviews(tmdbId),
    ])
      .then(([movieRes, reviewRes]) => {
        setMovie(movieRes.data);
        setReviews(reviewRes.data.reviews);
        setReviewStats(reviewRes.data.stats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tmdbId]);

  useEffect(() => {
    if (!user) {
      setWatchlistItem(null);
      return;
    }
    watchlistApi.getMyWatchlist()
      .then(({ data }) => {
        const item = data.find((i) => i.tmdbId === parseInt(tmdbId, 10));
        setWatchlistItem(item || null);
        setPersonalRating(item?.personalRating || null);
      })
      .catch(console.error);
  }, [user, tmdbId]);

  const handlePersonalRating = async (rating) => {
    setPersonalRating(rating);
    if (watchlistItem) {
      const { data } = await watchlistApi.updateWatchlistItem(tmdbId, { personalRating: rating });
      setWatchlistItem(data);
    } else if (movie) {
      const { data } = await watchlistApi.addToWatchlist({
        tmdbId: movie.tmdbId,
        title: movie.title,
        posterPath: movie.posterPath,
        releaseYear: movie.releaseYear,
        personalRating: rating,
      });
      setWatchlistItem(data);
    }
  };

  const handleCreateReview = async (formData) => {
    const { data } = await reviewApi.createReview({
      tmdbId: parseInt(tmdbId, 10),
      title: movie.title,
      ...formData,
    });
    setReviews((prev) => [data, ...prev]);
    const { data: reviewData } = await reviewApi.getMovieReviews(tmdbId);
    setReviewStats(reviewData.stats);
  };

  if (loading) return <Spinner fullPage />;
  if (!movie) return <div className="container"><p>Movie not found.</p></div>;

  return (
    <div className="page">
      <MovieDetailsHeader
        movie={movie}
        userRating={reviewStats}
        watchlistControls={
          <div className="movie-actions">
            <WatchlistButton movie={movie} watchlistItem={watchlistItem} onUpdate={setWatchlistItem} />
            {movie.trailer && (
              <button type="button" className="btn btn--secondary" onClick={() => setShowTrailer(true)}>
                ▶ Watch Trailer
              </button>
            )}
          </div>
        }
      />

      <div className="container page-content">
        {user && watchlistItem && (
          <section className="section">
            <RatingInput value={personalRating || 0} onChange={handlePersonalRating} label="Personal Rating" />
          </section>
        )}

        <CastList cast={movie.cast} />

        <section className="section">
          <h2>Reviews</h2>
          {user && !reviews.some((r) => (r.userId?._id || r.userId) === user._id) && (
            <ReviewForm onSubmit={handleCreateReview} />
          )}
          <ReviewList
            reviews={reviews}
            onUpdate={(updated) => setReviews((prev) => prev.map((r) => r._id === updated._id ? updated : r))}
            onDelete={(id) => setReviews((prev) => prev.filter((r) => r._id !== id))}
          />
        </section>
      </div>

      {showTrailer && (
        <TrailerModal trailer={movie.trailer} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
}
