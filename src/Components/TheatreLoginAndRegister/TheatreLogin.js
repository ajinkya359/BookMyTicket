import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router";
import "../SignInAndRegisterComponent/SignIn.css";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";
import axios from "axios";

function TheatreLogin() {
    const history=useHistory()
  const [err, setErr] = useState("");
  const submitHandler = (e) => {
    //   console.log("sent request")
    e.preventDefault();
    const theatre_id = document.getElementById("theatre_id").value;
    const password = document.getElementById("password").value;
    const details = {
      theatre_id: theatre_id,
      password: password,
    };
    const url = backEndUrl + "/theatres/login";
    axios
    .post(url, details, { withCredentials: true })
    .then(res=>{
        // console.log(res.data)
        const data=res.data
        if(data.authenticated)
        {
            localStorage.setItem('username',data.theatre_name)
            localStorage.setItem("sessionID",data.sessionID)
            localStorage.setItem("theatre_id",data.theatre_id)
            localStorage.setItem("isTheatre",true)
            history.push('/theatre/dashboard')
            setErr("logged in")
        }else{
            setErr(data.err)
        }
    })
    .catch(err=>{
        // console.log(err)
        alert(err)
    });
  };
  return (
    <div>
      <NavBar searchBar={true} />
      <div className="signIn">
        <h6 style={{ color: "red" }}>{err}</h6>
        <Form className="form" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Theatre ID</Form.Label>
            <Form.Control type="number" placeholder="eg-:69" id="theatre_id" />
            <Form.Text className="text-muted">Enter Theatre ID here</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              id="password"
            />
          </Form.Group>

          <Button variant="danger" type="submit" id="submitButton">
            SignIn
          </Button>
          <Button variant="link">Not registered? Register Here.</Button>
        </Form>
      </div>
    </div>
  );
}

export default TheatreLogin;
