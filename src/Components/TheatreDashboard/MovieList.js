import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { Spinner } from "react-bootstrap";
import MovieDetail from "./MovieDetail";

function MovieList() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },3000)
  });

  return (
    <div className="movie_list">
      {loading ? (
        // <div style={}>
        <Spinner animation="border" variant="secondary" />
      ) : (
        // </div>
        <div>
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
          <MovieDetail />
        </div>
      )}
    </div>
  );
}

export default MovieList;
