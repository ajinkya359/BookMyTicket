import "./App.css";
import React, {useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadBar from "./Components/HeadBar";
import Body from "./Components/Body";

function App() {
  const [signInVisible, changeSignInVisible] = useState(false);
  const [registerVisible, changeRegisterVisible] = useState(true);
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
    
     {/* <Register/> */}
    </div>
  );
}

export default App;
