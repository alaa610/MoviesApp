import { Link} from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"
import SearchBar from './SearchBar'

function Navbar({ wishlistCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top transparent">
      <div className="container">
        <Link className="navbar-brand fw-bold" style={{ color: '#f02411ff' }} to="/">Movies</Link>

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
                <SearchBar />
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
          
          <div className="d-lg-none mt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
