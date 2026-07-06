export default function RatingInput({ value, onChange, label = 'Your Rating' }) {
  return (
    <div className="rating-input">
      <label>{label}</label>
      <div className="rating-input__stars">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            className={`rating-input__btn ${value >= n ? 'rating-input__btn--active' : ''}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
