import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const link = "/movie-details/" + props.id;

  return (
    <ReactBootstrap.Col>
      <ReactBootstrap.Card bg="dark" text="light">
        <Link to={link}>
          <ReactBootstrap.Card.Img variant="top" src={props.img} />
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>{props.title}</ReactBootstrap.Card.Title>
          </ReactBootstrap.Card.Body>
        </Link>
      </ReactBootstrap.Card>
    </ReactBootstrap.Col>
  );
};

export default MovieCard;
