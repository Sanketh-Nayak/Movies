import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import * as movieApi from '../api/movieApi';

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      movieApi.getPopular(),
      movieApi.getTopRated(),
      movieApi.getUpcoming(),
    ])
      .then(([pop, top, up]) => {
        setPopular(pop.data.results);
        setTopRated(top.data.results);
        setUpcoming(up.data.results);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <h1>Discover. Track. Review.</h1>
          <p>Your personal movie companion powered by TMDB.</p>
          <SearchBar />
        </div>
      </section>

      <div className="container page-sections">
        <section>
          <h2>Popular Now</h2>
          <MovieGrid movies={popular} loading={loading} />
        </section>
        <section>
          <h2>Top Rated</h2>
          <MovieGrid movies={topRated} loading={loading} />
        </section>
        <section>
          <h2>Coming Soon</h2>
          <MovieGrid movies={upcoming} loading={loading} />
        </section>
      </div>
    </div>
  );
}
