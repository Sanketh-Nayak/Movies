import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as reviewApi from '../api/reviewApi';
import ReviewForm from './ReviewForm';

export default function ReviewCard({ review, onUpdate, onDelete }) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [revealed, setRevealed] = useState(!review.containsSpoiler);
  const [likesCount, setLikesCount] = useState(review.likes?.length || 0);
  const [liked, setLiked] = useState(
    user ? review.likes?.some((id) => (typeof id === 'string' ? id : id._id) === user._id) : false
  );

  const author = review.userId?.name || 'Unknown';
  const authorId = review.userId?._id;

  const handleLike = async () => {
    if (!user) return;
    try {
      const { data } = await reviewApi.likeReview(review._id);
      setLikesCount(data.likesCount);
      setLiked(data.liked);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to like');
    }
  };

  const handleReport = async () => {
    const reason = prompt('Why are you reporting this review?');
    if (!reason?.trim()) return;
    try {
      await reviewApi.reportReview(review._id, reason);
      alert('Report submitted. Thank you.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to report');
    }
  };

  const handleUpdate = async (data) => {
    const { data: updated } = await reviewApi.updateReview(review._id, data);
    onUpdate?.(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm('Delete this review?')) return;
    await reviewApi.deleteReview(review._id);
    onDelete?.(review._id);
  };

  const isOwner = user?._id === (review.userId?._id || review.userId);

  if (editing) {
    return (
      <div className="review-card">
        <ReviewForm
          initial={review}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <article className="review-card">
      <header className="review-card__header">
        <div>
          {authorId ? (
            <Link to={`/users/${authorId}`} className="review-card__author">{author}</Link>
          ) : (
            <span className="review-card__author">{author}</span>
          )}
          <span className="review-card__rating">★ {review.rating}/10</span>
        </div>
        <time className="review-card__date">
          {new Date(review.createdAt).toLocaleDateString()}
        </time>
      </header>

      {review.containsSpoiler && !revealed ? (
        <button type="button" className="spoiler-warning" onClick={() => setRevealed(true)}>
          ⚠ Spoiler — Click to reveal
        </button>
      ) : (
        <p className="review-card__content">{review.content}</p>
      )}

      <footer className="review-card__footer">
        <button type="button" className={`btn-like ${liked ? 'btn-like--active' : ''}`} onClick={handleLike}>
          ♥ {likesCount}
        </button>
        {user && !isOwner && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={handleReport}>
            Report
          </button>
        )}
        {isOwner && (
          <>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className="btn btn--danger btn--sm" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </footer>
    </article>
  );
}
