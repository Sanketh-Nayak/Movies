export default function CastList({ cast }) {
  if (!cast?.length) return null;

  return (
    <section className="cast-list">
      <h2>Cast</h2>
      <div className="cast-list__grid">
        {cast.map((member) => (
          <div key={member.id} className="cast-card">
            <img
              src={member.profileUrl || 'https://via.placeholder.com/185x278/333/aaa?text=?'}
              alt={member.name}
              className="cast-card__photo"
              loading="lazy"
            />
            <p className="cast-card__name">{member.name}</p>
            <p className="cast-card__role">{member.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
