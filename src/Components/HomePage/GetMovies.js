import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import * as ReactBootstrap from "react-bootstrap";
import styles from "./GetMovies.module.css";
import { Spinner } from "react-bootstrap";
import { currentAPIKey } from "../../Server/BackEndConnect/apiKeys";

const GetMovies = (props) => {
  const [isMoviesFetched, setMoviesFetched] = useState({
    getStatus: false,
    message: "Loading Movies...",
    list: null,
  });

  const fetchMovies = async () => {
    const urlString = props.searchTitle
      ? `Search/${currentAPIKey}/` + props.searchTitle
      : `ComingSoon/${currentAPIKey}`;

    const url = "https://imdb-api.com/en/API/" + urlString;

    const response = await fetch(url);

    if (response.status >= 200 && response.status <= 299) {
      return await response.json();
    } else {
      throw new Error(
        "Something went wrong, Unable to Fetch Movies. Please Reload or try contacting the company. ThankYou"
      );
    }
  };

  const movieCard = (item) => {
    // console.log(item);
    return (
      <MovieCard
        key={item.id}
        title={item.title}
        img={item.image}
        id={item.id}
      />
    );
  };

  useEffect(() => {
    const response = fetchMovies();
    response
      .then((data) => {
        const items = !props.searchTitle ? data.items : data.results;
        setMoviesFetched({
          getStatus: true,
          message: " Movies Loaded",
          list: items,
        });
      },[props])
      .catch((err) => {
        setMoviesFetched({
          getStatus: false,
          message: err.message,
          list: null,
        });
        console.log(err);
      });
    },[props]);

  return (
    <div className={styles["movies-container"]}>
      {!isMoviesFetched.getStatus && (
        <Spinner animation="border" variant="secondary" />
      )}
      {isMoviesFetched.getStatus && (
        <ReactBootstrap.Row xs={2} md={5} lg={6} className="g-4">
          {isMoviesFetched.list.map(movieCard)}
        </ReactBootstrap.Row>
      )}
    </div>
  );
};

export default GetMovies;
