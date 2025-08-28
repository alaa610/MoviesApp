import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MoviesList from "./pages/MoviesList";
import Home from "./pages/Home";
import Footer from "./components/Footer";
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

 const toggleWishlist = (item) => {
  setWishlist((current) => {
    const exists = current.some((m) => m.id === item.id);
    return exists 
      ? current.filter((m) => m.id !== item.id) 
      : [...current, item];
  });
};

  return (
    <>
      <Navbar wishlistCount={wishlist.length} />

      <div className="container" id="main-content">
        <Routes>
          <Route path="/" element={<Home wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/search/:query" element={<SearchResults wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
          <Route path="/tv" element={<TVShowsList  wishlist={wishlist}  onToggleWishlist={toggleWishlist}/>} />
          <Route path="/tv/:id" element={<TVShowDetails />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
