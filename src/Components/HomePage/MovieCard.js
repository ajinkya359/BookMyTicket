import React from "react";
import * as ReactBootstrap from "react-bootstrap";
// import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  return (
    <ReactBootstrap.Col>
      <ReactBootstrap.Card bg="dark" text="light">
        <ReactBootstrap.Card.Img variant="top" src={props.img} />
        <ReactBootstrap.Card.Body>
          <ReactBootstrap.Card.Title>{props.title}</ReactBootstrap.Card.Title>
        </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>
    </ReactBootstrap.Col>
  );
};

export default MovieCard;
