export default function Spinner({ fullPage = false }) {
  return (
    <div className={`spinner-wrap ${fullPage ? 'spinner-wrap--full' : ''}`}>
      <div className="spinner" />
    </div>
  );
}
