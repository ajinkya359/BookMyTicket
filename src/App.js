import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUs from "./Components/About-us/about-us.js";
// import HeadBar from "./Components/HeadBar";
// import Body from "./Components/Body";
// import MovieCard from "./Components/MovieCard";
// import HomePage from "./Components/HomePage/HomePage";
// // import TheatreListOfChosenMovie from "./Components/TheatreShowOnMovieSelect/TheatreListOfChosenMovie";
// import DateAndTime from "./Components/TheatreShowOnMovieSelect/DateAndTime";
// // import TheatreDetailsAndMovieTime from "./Components/TheatreShowOnMovieSelect/TheatreDetailsAndMovieTime";
// import TheatreList from "./Components/TheatreShowOnMovieSelect/TheatreList";

function App() {
  // const [signInVisible, changeSignInVisible] = useState(true);
  // const [registerVisible, changeRegisterVisible] = useState(false);
  // const showSignIn = () => {
  //   changeSignInVisible(true);
  //   changeRegisterVisible(false);
  // };
  // const showRegister = () => {
  //   changeSignInVisible(false);
  //   changeRegisterVisible(true);
  // };
 
  return (
    <div>
{/*         
         <HomePage /> 
     <HeadBar showSignIn={showSignIn} showRegister={showRegister} />
      <Body signIn={signInVisible} register={registerVisible} /> 
       <TheatreListOfChosenMovie movie_id={1}/> 
       <DateAndTime/> 
       <TheatreDetailsAndMovieTime />
      <TheatreDetailsAndMovieTime />
      <TheatreDetailsAndMovieTime />
      <TheatreDetailsAndMovieTime />
      <TheatreDetailsAndMovieTime /> 
      <TheatreList movie_id={4}/>   */}
      <AboutUs/>
      </div>
      );
}

export default App;
