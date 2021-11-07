import React, { Fragment, useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const params = useParams();
  const [isFetched, setFetched] = useState({
    status: false,
    message: "Loading Movie Details",
    data: "",
  });

  const fetchMovieDetails = async () => {
    const url =
      "https://imdb-api.com/en/API/Title/k_z51xge10/" + params.movieId;
    console.log(url);
    const response = await fetch(url);
    if (response.status >= 200 && response.status <= 299)
      return response.json();
    else throw new Error("Unable to fetch Movie Details");
  };

  useEffect(() => {
    const response = fetchMovieDetails();
    response
      .then((data) => {
        console.log(data);
        setFetched({
          status: true,
          message: "",
          data: data,
        });
      })
      .catch((err) => {
        setFetched({
          status: false,
          message: err.message,
          data: "",
        });
      });
  }, []);

  console.log(params.movieId);
  return (
    <Fragment>
      {!isFetched.status && <p>{isFetched.message}</p>}
      {isFetched.status && (
        <div>
          {console.log(isFetched.data)}
          <ReactBootstrap.Card bg="dark" text="light">
            <ReactBootstrap.Card.Header className={styles.header}>
              {isFetched.data.fullTitle}
            </ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body className={styles.body}>
              <ReactBootstrap.Card.Img
                variant="top"
                src={isFetched.data.image}
                className={styles.img}
              />
              <ReactBootstrap.Card.Text className={styles.plot}>
                {isFetched.data.plot}
              </ReactBootstrap.Card.Text>
            </ReactBootstrap.Card.Body>
            <ReactBootstrap.Button variant="danger">
              Book Ticket
            </ReactBootstrap.Button>
          </ReactBootstrap.Card>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetails;
