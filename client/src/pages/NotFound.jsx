import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page container not-found">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn--primary">Go Home</Link>
    </div>
  );
}
