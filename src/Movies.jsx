import "./App.css";

import { useEffect, useState } from "react";

import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "9bc7705f330ff1c756a120d71458c55f";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch movies");
        setLoading(false);
        console.error("API Error Details:", error.response || error.message);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movies-container">
      <h1 className="title">Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </div>
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">⭐ {movie.vote_average}</p>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
