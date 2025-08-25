import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./pages/SearchResults";
import TVShowsList from "./pages/TVShowsList";
import TVShowDetails from "./pages/TVShowDetails";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (movie) => {
    setWishlist((current) => {
      const exists = current.some((m) => m.id === movie.id);
      return exists ? current.filter((m) => m.id !== movie.id) : [...current, movie];
    });
  };

  return (
    <>
      {/* هنا بعتنا العدد للـ Navbar */}
      <Navbar wishlistCount={wishlist.length} />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MoviesList wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/search/:query" element={<SearchResults wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/tv" element={<TVShowsList />} />
          <Route path="/tv/:id" element={<TVShowDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
