export default function GenreFilter({ genres, selected, onChange }) {
  if (!genres?.length) return null;

  return (
    <div className="genre-filter">
      <button
        type="button"
        className={`genre-filter__btn ${!selected ? 'genre-filter__btn--active' : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={`genre-filter__btn ${selected === genre.id ? 'genre-filter__btn--active' : ''}`}
          onClick={() => onChange(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
