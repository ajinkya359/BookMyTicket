import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router";
import "./SignIn.css";
const axios = require("axios");
const backend_url = require("../../Server/BackEndConnect/backEndUrl");

function ContactUS() {
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
    alert("We have noted your complain ,we will get back to you")
    history.push('/')
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

          <div class="form-group" style={{ "margin-bottom": "2vh" }}>
            <label for="exampleFormControlTextarea1">Description</label>

            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ "margin-bottom": "2vh" }}
            ></textarea>
          </div>

          <Button variant="danger" type="submit" id="submitButton" >
            Send
          </Button>
          {/* <Button variant="link" onClick={handleRegisterClick}>
            Not registered? Register Here.
          </Button> */}
        </Form>
      </div>
    </div>
  );
}

export default ContactUS;
