import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import SearchBar from './SearchBar';
import { useState } from 'react';

function Navbar({ wishlistCount }) {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchSubmit = () => {
    setShowSearch(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top transparent">
      <div className="container d-flex justify-content-between align-items-center">
      
        <Link className="navbar-brand fw-bold" style={{ color: '#f02411ff' }} to="/">
          Movies
        </Link>

        <div className="d-flex align-items-center">
          <button
            className="btn text-white me-2 d-lg-none"
            onClick={() => setShowSearch(!showSearch)}
          >
            <i className="bi bi-search" style={{ fontSize: "20px" }}></i>
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tv">TV Shows</Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <div style={{ minWidth: 260 }}>
                <SearchBar onSubmit={handleSearchSubmit} />
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center text-white"
                to="/wishlist" >
                <i
                  className="bi bi-heart-fill me-1 wishlist-icon"
                  style={{ fontSize: "18px", transition: "color 0.3s" }}
                ></i>
                Wishlist ({wishlistCount})
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {showSearch && (
        <div className="position-absolute top-100 end-0 p-2 bg-dark rounded shadow"
          style={{ width: "85%", maxWidth: "300px", right: "10px", zIndex: 1050 }}>
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;