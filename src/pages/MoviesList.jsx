import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { getNowPlayingMovies } from "../api";

const MoviesListPage = ({ wishlist, onToggleWishlist}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    getNowPlayingMovies(page)
      .then((data) => {
        if (!isMounted) return;
        if (data?.error) {
          setError(data.error);
          setMovies([]);
        } else {
          setMovies(data?.results || []);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message || "Failed to load movies");
        setMovies([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div>
      <h1 className="h4 mb-2">Now Playing</h1>
      <div className="now-line my-2"></div>
      {loading && <p>Loading...</p>}
      {error && !loading && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {movies.map((movie) => (
            <div className="col" key={movie.id}>
              <MovieCard
                movie={movie}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some((m) => m.id === movie.id)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center my-4">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default MoviesListPage;