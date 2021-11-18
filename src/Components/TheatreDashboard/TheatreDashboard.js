import React from 'react'
import NavBar from '../NavBar/NavBar';
import MovieList from './MovieList';
import './TheatreDashboard.css'


function TheatreDashboard() {
    const theatre_logged_in=localStorage.getItem("isTheatre")
    return (
      <div>
        <div style={{ display: theatre_logged_in ? "visible" : "none" }} className="parent_block">
          <NavBar searchBar={false}  />
          <div className="theatre_dashboard">
              <MovieList/>
            </div>
        </div>
        <div style={{ display: !theatre_logged_in ? "visible" : "none" }}>
          <h1>first login ro see this page</h1>
        </div>
      </div>
    );
}

export default TheatreDashboard
