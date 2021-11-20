import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { Spinner } from "react-bootstrap";
import MovieDetail from "./MovieDetail";
import axios from "axios";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";

function MovieList(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchMovies();
  },[props.refresh]);

  const fetchMovies = async () => {
    try {
      const url = backEndUrl + "/theatres?theatre_id=" + props.theatre_id;
      await axios
        .get(url, { withCredentials: true })
        .then((res) => {
          console.log("length",res);
          if (res.data.lenght !== 0) setData(res.data);
        })
        .catch((err) => {
          alert(err);
        });
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="movie_list">
      {loading ? (
        // < style={}>
        <Spinner animation="border" variant="secondary" />
      ) : (
        <div style={{ width: "100%" }}>
          {data.length === 0 ? (
            <div style={{textAlign: "center" }}>
              <h1>"No movies available"</h1>
            </div>
          ) : (
            data.map((e, index) => (
              <MovieDetail
                index={index}
                movie_id={e.ID}
                movie_name={e.movie_name}
                time={e.time}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MovieList;
