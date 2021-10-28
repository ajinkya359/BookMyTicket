import React from "react";
import "./HeadBar.css";
import Button from "react-bootstrap/Button";

function HeadBar(props) {
  return (
    <div className="bruh">
      <div className="headBar">
        <div className="leftSide">Ticket Counter 🎫</div>
        <div className="rightSide">
          {/* <Button
            variant="primary"
            className="button"
            onClick={props.showSignIn}
          >
            LogIn
          </Button>
          <Button
            variant="light"
            className="button"
            onClick={props.showRegister}
          >
            SignUp
          </Button>
          <Button variant="link" className="button">
            AboutUs
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default HeadBar;
