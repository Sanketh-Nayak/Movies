import { useState } from 'react';
import RatingInput from './RatingInput';

export default function ReviewForm({ initial, onSubmit, onCancel }) {
  const [rating, setRating] = useState(initial?.rating || 7);
  const [content, setContent] = useState(initial?.content || '');
  const [containsSpoiler, setContainsSpoiler] = useState(initial?.containsSpoiler || false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await onSubmit({ rating, content: content.trim(), containsSpoiler });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <RatingInput value={rating} onChange={setRating} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review..."
        rows={5}
        required
        className="textarea"
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={containsSpoiler}
          onChange={(e) => setContainsSpoiler(e.target.checked)}
        />
        Contains spoilers
      </label>
      <div className="review-form__actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        )}
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {initial ? 'Update Review' : 'Post Review'}
        </button>
      </div>
    </form>
  );
}
