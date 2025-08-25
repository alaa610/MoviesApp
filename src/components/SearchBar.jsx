import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (query.trim()) navigate(`/search/${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} className="d-flex gap-2">
      <input
        type="search"
        className="form-control"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-warning" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;

