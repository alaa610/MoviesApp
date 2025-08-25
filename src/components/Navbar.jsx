import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"

function Navbar({ wishlistCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">Movie App</Link>

        {/* Navbar Toggler (mobile view) */}
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

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tv">TV Shows</Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link d-flex align-items-center" 
                to="/wishlist"
              >
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
    </nav>
  )
}

export default Navbar
