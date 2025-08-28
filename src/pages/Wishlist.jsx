import React from "react";
import MovieCard from "../components/MovieCard";

const Wishlist = ({ wishlist, onToggleWishlist }) => {
    if (wishlist.length === 0) {
        return (
            <div className="text-center py-5">
                <h2 className="h4 mb-3">Your Wishlist</h2>
                <p className="text-muted">Your wishlist is empty. Start adding movies from the Now Playing or Search pages!</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="h4 mb-3 wishlist-title">Your Wishlist ({wishlist.length} movies)</h2>
            <div className="now-line my-2"></div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {wishlist.map((movie) => (
                    <div className="col" key={movie.id}>
                        <MovieCard
                            movie={movie}
                            onToggleWishlist={onToggleWishlist}
                            isWishlisted={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
