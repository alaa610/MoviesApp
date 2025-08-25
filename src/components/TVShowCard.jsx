import React, { useState } from "react";
import { getImageUrl } from "../api";
import { Link } from "react-router-dom";

const TVShowCard = ({ show, onToggleWishlist, isWishlisted = false }) => {
  const [imgSrc, setImgSrc] = useState(
    getImageUrl(show.poster_path, "w342")
  );

  return (
    <div className="card h-100 shadow-sm border-0 position-relative">
      <Link
        to={`/tv/${show.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={imgSrc}
          alt={show.name}
          className="card-img-top"
          onError={() =>
            setImgSrc("https://via.placeholder.com/342x513?text=No+Image")
          }
          loading="lazy"
        />
        <div className="card-body">
          <h6
            className="card-title mb-1 text-truncate"
            title={show.name}
          >
            {show.name}
          </h6>
          <small className="text-muted">
            {show.first_air_date
              ? new Date(show.first_air_date).getFullYear()
              : "N/A"}
          </small>
        </div>
      </Link>
    </div>
  );
};

export default TVShowCard;
