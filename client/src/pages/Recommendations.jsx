import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import Spinner from '../components/Spinner';
import * as userApi from '../api/userApi';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.getRecommendations()
      .then(({ data }) => {
        setRecommendations(data.recommendations || []);
        setMessage(data.message || '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page container">
      <h1>Recommended For You</h1>
      <p className="page-subtitle">
        Based on genres from movies you've watched and rated highly.
      </p>
      {message && <p className="info-banner">{message}</p>}
      <MovieGrid movies={recommendations} loading={false} />
    </div>
  );
}
