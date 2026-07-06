import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="search-bar__input"
      />
      <button type="submit" className="btn btn--primary">Search</button>
    </form>
  );
}
