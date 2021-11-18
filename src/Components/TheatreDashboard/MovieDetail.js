import React from 'react'
import Button from "react-bootstrap/Button";
import './MovieDetail.css'

function MovieDetail() {
    return (
      <div className="movie_details">
        <div className="movie_name">Resident evil</div>
        <div className="movie_name">
          No. of seats
          <Button style={{ width: "50%" }}>Modify </Button>
        </div>
        <div className="movie_name">
          Ticket basic fare
          <Button style={{ width: "50%" }}>Modify</Button>
        </div>
        <div className="movie_name">
          Ticket premium fare
          <Button style={{ width: "50%" }}>Modify </Button>
        </div>
        <div className="movie_name">
          <Button variant="danger" style={{ width: "50%" }}>
            Delete movie
          </Button>
        </div>
      </div>
    );
}

export default MovieDetail
