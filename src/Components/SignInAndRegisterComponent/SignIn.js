import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router";
import "./SignIn.css";
const axios = require("axios");
const backend_url = require("../../Server/BackEndConnect/backEndUrl");

function SignInFunc() {
  const history = useHistory();
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [err, errChange] = useState("");
  const [loggedin,setloggedin]=useState(localStorage.getItem('sessionID')!==null)

  useEffect(()=>{
    if(loggedin){
      history.push('/')
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const details = {
      email: email,
      password: password,
    };
    const url = backend_url + "/users/login";
    console.log(url);
    axios
      .post(url, details, { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.authenticated) {
          localStorage.setItem('sessionID',data.sessionID)
          localStorage.setItem('username',data.user.username)
          localStorage.setItem('userID',data.user.ID)
          localStorage.setItem('isUser',true)
          console.log("login", response);
          setloggedin(true)
          history.push('/')
          errChange("loggedin");
        } else {
          console.log("error");
          errChange(response.data.err);
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
    // console.log(password);
  };
  const handleRegisterClick = () => {
    history.push("/register");
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
