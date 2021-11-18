import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadBar from "./Components/HeadBar";
import Body from "./Components/Body";
import MovieCard from "./Components/MovieCard";
import HomePage from "./Components/HomePage/HomePage";
import { Route, Switch } from "react-router-dom";
import MovieDetails from "./Components/HomePage/MovieDetails";
import SignInFunc from "./Components/SignInAndRegisterComponent/SignIn";
import TheatreList from "./Components/TheatreShowOnMovieSelect/TheatreList";
import Register from "./Components/SignInAndRegisterComponent/Register";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import SeatModal from "./Components/SeatModal";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <SignInFunc />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/movie-details/:movieId">
          <MovieDetails />
        </Route>
        <Route path="/theatres_list/:movieId">
          <TheatreList />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
