import React from "react";
import NavBar from "../NavBar/NavBar";
import Button from "react-bootstrap/Button";
import MovieList from "./MovieList";
import "./TheatreDashboard.css";
import { useHistory } from "react-router";

function TheatreDashboard() {
  const history=useHistory()
  const theatre_logged_in =
    localStorage.getItem("isTheatre") !== null &&
    localStorage.getItem("isTheatre");
  // if(theatre_logged_in===null) th
  return (
    <div>
      {/* {console.log("theatre logged in", theatre_logged_in)} */}
      {theatre_logged_in ? (
        <div className="parent_block">
          <NavBar searchBar={false} />
          <div className="theatre_dashboard">
            <MovieList theatre_id={localStorage.getItem("theatre_id")} />
          </div>
        </div>
      ) : (
        <div >
          <h1>first login ro see this page</h1>
          <Button variant="danger" onClick={()=>history.push('/theatre/login')}>Theatre Login</Button>
        </div>
      )}
    </div>
  );
}

export default TheatreDashboard;
