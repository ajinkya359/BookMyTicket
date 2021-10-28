import React from "react";
import SignIn from "../Components/SignIn";
import Register from "../Components/Register";

function Body(props) {
  const registerOrSignIn = () => {
    if (props.signIn) return <SignIn />;
    else return <Register />;
  };

  return <div>{registerOrSignIn()}</div>;
}

export default Body;
