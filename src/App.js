import "./Components/SignIn";
import "./App.css";
import React, {useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadBar from "./Components/HeadBar";
import Body from "./Components/Body";
import MovieCard from "./Components/MovieCard";

function App() {
  const [signInVisible, changeSignInVisible] = useState(true);
  const [registerVisible, changeRegisterVisible] = useState(false);
  const showSignIn = () => {
    changeSignInVisible(true);
    changeRegisterVisible(false);
  };
  const showRegister = () => {
    changeSignInVisible(false);
    changeRegisterVisible(true);
  };

  return (
    <div>
      <HeadBar showSignIn={showSignIn} showRegister={showRegister} />
      <Body signIn={signInVisible} register={registerVisible} />

    </div>
  );
}

export default App;
