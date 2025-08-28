import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularTVShows } from "../api";
import TVShowCard from "../components/TVShowCard";
import Pagination from "../components/Pagination";

function TVShowsList({ wishlist, onToggleWishlist, hideHeroSearch = false }) {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getPopularTVShows(page)
      .then((data) => {
        if (!mounted) return;
        if (data?.error) {
          setError(data.error);
          setShows([]);
        } else {
          setShows(data?.results || []);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Failed to load TV shows");
        setShows([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [page]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div>
      <h1 className="h4 mb-2 showsTitle">Popular TV Shows</h1>
      <div className="now-line my-2"></div>
      {loading && <p>Loading...</p>}
      {error && !loading && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {shows.map((show) => (
            <div className="col" key={show.id}>
              <TVShowCard
                show={show}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some((s) => s.id === show.id)}
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
}

export default TVShowsList;
