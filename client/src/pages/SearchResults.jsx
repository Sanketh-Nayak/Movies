import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import GenreFilter from '../components/GenreFilter';
import * as movieApi from '../api/movieApi';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const genreId = searchParams.get('genre');
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    movieApi.getGenres().then(({ data }) => setGenres(data)).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetch = genreId
      ? movieApi.getByGenre(genreId, page)
      : query
        ? movieApi.searchMovies(query, page)
        : movieApi.getPopular(page);

    fetch
      .then(({ data }) => {
        setMovies(data.results);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query, genreId, page]);

  const handleGenreChange = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set('genre', id);
    else params.delete('genre');
    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', p);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page container">
      <h1>{query ? `Results for "${query}"` : genreId ? 'Browse by Genre' : 'Browse Movies'}</h1>
      <SearchBar initialQuery={query} />
      <GenreFilter genres={genres} selected={genreId ? parseInt(genreId, 10) : null} onChange={handleGenreChange} />
      <MovieGrid movies={movies} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
