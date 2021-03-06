import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router";

import "./Register.css";
const axios = require("axios");
const backend_url = require("../../Server/BackEndConnect/backEndUrl");

function TheatreRegister() {
  const history = useHistory();
  const [err, errChange] = useState("");
  const [userName, userNameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [mobileNo, mobileNoChange] = useState("");
  const loggedin = localStorage.getItem("sessionID") !== null

  useEffect(() => {
    if (loggedin) {
      history.push("/");
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const details = {
      email: email,
      password: password,
      userName: userName,
      mobileNo: mobileNo,
    };
    console.log(details);
    const url = backend_url + "/theatres/register";
    console.log(url);
    axios
      .post(url, details, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data.registered === false) {
          console.log(response);
          errChange(response.data.err);
          
        } else {
          alert("Theatre registerd ,your theatreID is "+response.data.theatre_id+". Dont forget it.")
          history.push('/theatre/login')
          errChange("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(JSON.stringify(details));
  };
  const handleUserNameChange = (e) => {
    userNameChange(e.target.value);
    console.log(userName);
  };
  const handleEmailChange = (e) => {
    emailChange(e.target.value);
    console.log(email);
  };
  const handlePasswordChange = (e) => {
    passwordChange(e.target.value);
    console.log(password);
  };
  const handleMobileChange = (e) => {
    mobileNoChange(e.target.value);
    console.log(mobileNo);
  };
  const handleSignInClick = () => {
    history.push("/theatre/login");
  };
  return (
    <div>
      <NavBar searchBar={false}/>
      <div className="signIn">
        <h6 style={{ color: "red" }}>{err}</h6>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={handleUserNameChange}
          >
            <Form.Label>TheatreName</Form.Label>
            <Form.Control
              type="text"
              placeholder="eg-:Donald"
              //   onChange={this.change}
            />
            <Form.Text className="text-muted">Enter First name here</Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={handleEmailChange}
          >
            <Form.Label>Theatre Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="saveAmericaTheatre@usa.com"
            />
            <Form.Text className="text-muted">Enter your email here.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <Form.Text className="text-muted">
              Enter you password here
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile No."
              onChange={handleMobileChange}
            />
            <Form.Text className="text-muted">Enter Mobile No here</Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep Me signed In" />
            </Form.Group> */}
          <Button variant="danger" type="submit" id="submitButton">
            Register
          </Button>
          <Button variant="link" onClick={handleSignInClick}>
            Already registered? SignIn Here.
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default TheatreRegister;
