import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import Spinner from '../components/Spinner';
import * as reviewApi from '../api/reviewApi';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewApi.getMyReviews()
      .then(({ data }) => setReviews(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page container">
      <h1>My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="empty-state">You haven't written any reviews yet.</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review._id}>
              <Link to={`/movies/${review.tmdbId}`} className="review-movie-link">
                {review.title}
              </Link>
              <ReviewCard
                review={{ ...review, userId: review.userId || { _id: review.userId } }}
                onUpdate={(updated) => setReviews((prev) => prev.map((r) => r._id === updated._id ? updated : r))}
                onDelete={(id) => setReviews((prev) => prev.filter((r) => r._id !== id))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
