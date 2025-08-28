import MediaCard from "./MediaCard";

const MovieCard = ({ movie, onToggleWishlist, isWishlisted }) => {
  return (
    <MediaCard
      item={movie}
      type="movie"
      onToggleWishlist={onToggleWishlist}
      isWishlisted={isWishlisted}
    />
  );
};

export default MovieCard;