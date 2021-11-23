import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/HomePage/HomePage";
import { Route, Switch } from "react-router-dom";
import MovieDetails from "./Components/HomePage/MovieDetails";
import SignInFunc from "./Components/SignInAndRegisterComponent/SignIn";
import TheatreList from "./Components/TheatreShowOnMovieSelect/TheatreList";
import Register from "./Components/SignInAndRegisterComponent/Register";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import TheatreLogin from "./Components/TheatreLoginAndRegister/TheatreLogin";
import TheatreDashboard from "./Components/TheatreDashboard/TheatreDashboard";
import Seats from "./Components/SelectSeatPage/SeatStatus";
import OrderSummary from "./Components/OrderSummary";

function App() {
  return (
    // <>
    //   {/* <Seat/> */}
    //   <SeatStatus/>
    //   {/* <AllSeatContainer prime_rows={4} prime_columns={3} standard_rows={3} standard_columns={3}/> */}
    // </>
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
        <Route path="/theatre/login">
          <TheatreLogin />
        </Route>
        <Route path="/theatre/dashboard">
          <TheatreDashboard/>
        </Route>
        <Route path="/book_ticket/:theatre_id/:movie_id/:time/:theatre_name">
          <Seats/>
        </Route>
        <Route path="/order_summary/:total_cost/:theatre_name/:time/:premium/:standard">
          <OrderSummary/>
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
