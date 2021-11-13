import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../NavBar/NavBar";
import MovieDetails from "./MovieDetails";
import TheatreDetailsAndMovieTime from "./TheatreDetailsAndMovieTime";

function TheatreList() {
  const params = useParams();
  const [theatreList, setTheatreList] = useState([]);
  const [movieName, setMovieName] = useState("");
  const movie_id = params.movieId;
  // console.log("theatreList",params)
  useEffect(() => {
    console.log("making request");
    const body = { id: movie_id };
    axios
      .post("http://localhost:5000/search_theatres", body)
      .then((response) => {
        if('theatre_list' in response.data)setTheatreList(response.data.theatre_list);
        if('movie_name' in response.data)setMovieName(response.data.movie_name);
        console.log("response", response.data);
        // console.log(response.data)
        // setTheatreDetails(response.data)
      })
      .catch((err) => console.log(err));
  }, [movie_id]);
  return (
    <div>

      {/* <HeadBar heading={movieName} /> */}
      <NavBar searchBar={false}/>
      <MovieDetails name={movieName===''?'No halls available':`${movieName}`}/>
      <ul>
        {theatreList.map((e) => (
        
            <TheatreDetailsAndMovieTime
              key={e.theatre_id}
              theatreName={e.theatre_name}
              showTimes={e.times}
            />
          
        ))}
      </ul>
      </div>
  );
}

export default TheatreList;
