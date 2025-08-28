import React, { useState } from "react";
import { getImageUrl } from "../api";
import { Link } from "react-router-dom";

const MediaCard = ({ item, type, onToggleWishlist, isWishlisted = false }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(item.poster_path|| item.backdrop_path,"w342"));
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;

  return (
    <div className="card h-100 shadow-sm border-0 position-relative">
      <Link
        to={`/${type}/${item.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={imgSrc}
          alt={title}
          className="card-img-top"
          onError={() =>
            setImgSrc("https://via.placeholder.com/342x513?text=No+Image")
          }
          loading="lazy"
        />
        <div className="card-body">
          <h6 className="card-title mb-1 text-truncate" title={title}>
            {title}
          </h6>
          <small className="text-muted">
            {releaseDate
              ? new Date(releaseDate).getFullYear()
              : "N/A"}
          </small>
        </div>
      </Link>

      <button
        type="button"
        aria-label="Toggle wishlist"
        className={`btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm ${
          isWishlisted ? "text-danger" : "text-secondary"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleWishlist && onToggleWishlist(item);
        }}
      >
        <i className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>
      </button>
    </div>
  );
};

export default MediaCard;