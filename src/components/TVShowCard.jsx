import MediaCard from "./MediaCard";

const TVShowCard = ({ show, onToggleWishlist, isWishlisted }) => {
  return (
    <MediaCard
      item={show}
      type="tv"
      onToggleWishlist={onToggleWishlist}
      isWishlisted={isWishlisted}
    />
  );
};

export default TVShowCard;
