export default function TrailerModal({ trailer, onClose }) {
  if (!trailer) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal__video">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}
