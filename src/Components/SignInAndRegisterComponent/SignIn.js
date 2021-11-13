import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router";
import "./SignIn.css";
const axios = require("axios");
const backend_url = require("../../Server/BackEndConnect/backEndUrl");

function SignInFunc() {
  const history=useHistory();
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [err, errChange] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const details = {
      email: email,
      password: password,
    };
    const url = backend_url + "/login/user";
    console.log(url);
    axios
      .post(url, details)
      .then((response) => {
        console.log(response.data);
        if (response.data.signed_in === false) {
          console.log("error");
          errChange(response.data.err);
        } else {
          errChange("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(JSON.stringify(details));
  };

  const handleEmailChange = (e) => {
    emailChange(e.target.value);
    console.log(email);
  };
  const handlePasswordChange = (e) => {
    passwordChange(e.target.value);
    console.log(password);
  };
const handleRegisterClick=()=>{
  history.push('/register')
}
  return (
    <div>
      <NavBar searchBar={false} />
      <div className="signIn">
        <h6 style={{ color: "red" }}>{err}</h6>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={handleEmailChange}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="eg-:joeBiden@democratic.com"
              //   onChange={this.change}
            />
            <Form.Text className="text-muted">Enter email here</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button variant="danger" type="submit" id="submitButton">
            SignIn
          </Button>
          <Button variant="link" onClick={handleRegisterClick}>
            Not registered? Register Here.
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignInFunc;
