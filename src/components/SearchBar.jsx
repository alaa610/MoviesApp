import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ onClose }) {  
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setQuery("");

      if (onClose) {
        onClose();   
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="d-flex w-100 position-relative">
      <i
        className="bi bi-search position-absolute"
        style={{ left: 12, top: 10, color: "rgba(255, 255, 255, 0.7)" }}
      ></i>
      <input
        type="search"
        className="form-control search-translucent ps-5 me-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn rounded-pill text-white btnSearch" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;

