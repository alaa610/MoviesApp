import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getImageUrl, getRecommendedMovies } from "../api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getMovieDetails(id).then((data) => setMovie(data));
    getRecommendedMovies(id).then((data) =>
      setRecommendations(data.results || [])
    );
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating / 2);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rounded ? "text-warning" : "text-secondary"}
        >
          {i <= rounded ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <>
    <h2 className="h4 mb-3 wishlist-title">Movie Details</h2>
    <div className="now-line my-2"></div>
    <div
      className="movie-details p-4 text-white"
      style={{
        backgroundImage: `url(${getImageUrl(movie.backdrop_path, "w1280")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {/* Movie info */}
        <div className="d-flex flex-column flex-md-row gap-4">
          <div className="col-md-4">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-8">
            <h2 className="fw-bold">{movie.title}</h2>
            <p className="opacity-75">{formatDate(movie.release_date)}</p>
            <div className="d-flex align-items-center gap-2 mb-2">
              {renderStars(movie.vote_average)}
              <span className="fw-bold">{movie.vote_average?.toFixed(1)}</span>
              <span>({movie.vote_count} votes)</span>
            </div>
            <p className="opacity-75">{movie.overview}</p>
            <div className="mb-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="badge bg-warning text-dark me-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="d-flex gap-4 mt-4">
              <p>
                <strong>Duration:</strong> {movie.runtime} mins
              </p>
              <p>
                <strong>Language:</strong> {movie.spoken_languages?.[0]?.name}
              </p>
            </div>
            <div className="mt-3 d-flex flex-column justify-content-start align-items-start gap-2">
              {movie.production_companies?.[0]?.logo_path && (
                <img
                  src={getImageUrl(
                    movie.production_companies[0].logo_path,
                    "w200"
                  )}
                  alt="Studio Logo"
                  height={40}
                />
              )}
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  className="btn btn-outline-light btn-sm mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website 🔗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* Recommendations */}
      <div className="recommendations-section mt-5 text-white">
      <h2 className="mt-5 mb-4">Recommendations</h2>
      <div className="row">
        {recommendations.slice(0, 6).map((rec) => {
          const score = Math.round(rec.vote_average * 10);
          const scoreColor =
            score >= 75
              ? "bg-success"
              : score >= 60
              ? "bg-warning text-dark"
              : "bg-danger";
          return (
            <div
              key={rec.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
            >
              <Link
                to={`/movie/${rec.id}`}
                className="text-decoration-none text-dark"
              >
                <div
                  className="card position-relative shadow-sm h-100 transition"
                  style={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 0.5rem 1rem rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {/* Rating circle */}
                  <div
                    className={`position-absolute badge ${scoreColor}`}
                    style={{
                      left: "8px",
                      bottom: "65px",
                      width: "32px",
                      height: "32px",
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      zIndex: 2,
                    }}
                  >
                    {score}%
                  </div>
                  {/* Poster */}
                  <img
                    src={getImageUrl(rec.poster_path, "w200")}
                    className="card-img-top mb-4"
                    alt={rec.title}
                    style={{ height: "230px", objectFit: "cover" }}
                  />
                  {/* Title + Date */}
                  <div className="card-body p-2">
                    <h6
                      className="card-title mb-1"
                      style={{ fontSize: "0.85rem", fontWeight: "600" }}
                    >
                      {rec.title?.length > 20
                        ? rec.title.slice(0, 20) + "..."
                        : rec.title}
                    </h6>
                    <small className="text-muted">
                      {formatDate(rec.release_date)}
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default MovieDetails;