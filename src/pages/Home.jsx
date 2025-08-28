import React from "react";
import HeroSection from "../components/HeroSection";
import MoviesList from "./MoviesList";

function Home({ wishlist, onToggleWishlist }) {
  return (
    <div>
      <HeroSection />
      <MoviesList wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
    </div>
  );
}

export default Home;


