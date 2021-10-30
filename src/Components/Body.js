import React from "react";
import Register from "./SignInAndRegisterComponent/Register";
import SignIn from "./SignInAndRegisterComponent/SignIn";

function Body(props) {
  const registerOrSignIn = () => {
    if (props.signIn) return <SignIn/>;
    else return <Register/>;
  };

  return <div>{registerOrSignIn()}</div>;
}

export default Body;
