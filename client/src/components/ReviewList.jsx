import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews, onUpdate, onDelete }) {
  if (!reviews?.length) {
    return <p className="empty-state">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
