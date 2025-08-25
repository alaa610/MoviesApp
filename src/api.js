const API_KEY = "1fee6373663e3881c0ba4cc926d897a9";
const BASE_URL = "https://api.themoviedb.org/3";
//error handling
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("API Fetch Error:", error.message);
    return { error: error.message }; 
  }
};

// Playing Movies
export const getNowPlayingMovies = async (page = 1) => {
  return fetchData(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
};
// Popular Movies
export const getPopularMovies = (page = 1) =>
  fetchData(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
// Movie Details
export const getMovieDetails = async (id) => {
  return fetchData(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
};
// Recommended Movies
export const getRecommendedMovies = async (movieId) => {
  return fetchData(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
};
//Movie Reviews
export const getMovieReviews = async (movieId) => {
  return fetchData(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
};
// Search Movies
export const searchMovies = async (query, page = 1) => {
  return fetchData(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
};

//TV Shows Bonus
export const getPopularTVShows = (page = 1) =>
  fetchData(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);

export const getTVShowDetails = (id) =>
  fetchData(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);

let wishlist = [];

// Recommended TV Shows
export const getRecommendedTVShows = async (tvId) => {
  return fetchData(`${BASE_URL}/tv/${tvId}/recommendations?api_key=${API_KEY}`);
};


/*Add item to wishlist*/
export const addToWishlist = (item, type = "movie") => {
  const exists = wishlist.find((w) => w.id === item.id && w.type === type);
  if (!exists) {
    wishlist.push({ ...item, type });
  }
  return wishlist;
};
/* Remove item from wishlist */
export const removeFromWishlist = (id, type = "movie") => {
  wishlist = wishlist.filter((w) => !(w.id === id && w.type === type));
  return wishlist;
};
/* Toggle wishlist (add/remove)*/
export const toggleWishlist = (item, type = "movie") => {
  const exists = wishlist.find((w) => w.id === item.id && w.type === type);
  if (exists) {
    return removeFromWishlist(item.id, type);
  } else {
    return addToWishlist(item, type);
  }
};
/*Get wishlist item */
export const getWishlist = () => wishlist;

export const getImageUrl = (path, size = "w500") => {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};