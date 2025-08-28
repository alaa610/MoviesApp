import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import { searchMovies, searchTv } from "../api";
import Pagination from "../components/Pagination";

const SearchResults = ({ wishlist, onToggleWishlist }) => {
  const { query } = useParams();
  const [allResults, setAllResults] = useState([]); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 20; 

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError("");
    Promise.all([searchMovies(query), searchTv(query)]) 
      .then(([moviesData, tvData]) => {
        const movies =
          moviesData?.results?.map((m) => ({ ...m, type: "movie" })) || [];
        const tvShows =
          tvData?.results?.map((t) => ({ ...t, type: "tv" })) || [];
        const combined = [...movies, ...tvShows];

        setAllResults(combined);
        setTotalPages(Math.ceil(combined.length / itemsPerPage));
      })
      .catch((err) => {
        setError(err?.message || "Failed to load results");
        setAllResults([]);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);
  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setResults(allResults.slice(start, end));
  }, [allResults, page]);

  return (
    <div>
      <h1 className="h4 mb-3 searchresult">Search Results for "{query}"</h1>
      <div className="now-line my-2"></div>
      {loading && <p>Loading...</p>}
      {error && !loading && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            {results.map((item) => (
              <div className="col" key={`${item.type}-${item.id}`}>
                {item.type === "movie" ? (
                  <MovieCard
                    movie={item}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.some((m) => m.id === item.id)}
                  />
                ) : (
                  <TVShowCard
                    show={item}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.some((m) => m.id === item.id)}
                  />
                )}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;