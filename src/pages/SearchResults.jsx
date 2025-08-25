import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api";

const SearchResults = ({ wishlist, onToggleWishlist }) => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    searchMovies(query)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          setMovies([]);
        } else {
          setMovies(data?.results || []);
        }
      })
      .catch((err) => {
        setError(err?.message || "Failed to load movies");
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <h1 className="h4 mb-3">Search Results for "{query}"</h1>
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
    </div>
  );
};

export default SearchResults;
