import React, { useState} from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router";
import "../SignInAndRegisterComponent/SignIn.css";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";
import axios from "axios";

function TheatreLogin() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const makeRequest = async () => {
    try {
      const url = backEndUrl + "/theatres/login";
      const theatre_id = document.getElementById("theatre_id").value;
      const password = document.getElementById("password").value;
      if(theatre_id===""||password===""||theatre_id<0) throw Error("Enter valid input");
      const details = {
        theatre_id: theatre_id,
        password: password,
      };
      setLoading(true)
      document.getElementById('submitButton').disabled=true
      await axios
        .post(url, details, { withCredentials: true })
        .then((res) => {
          // console.log(res.data)
          const data = res.data;
          if (data.authenticated) {
            localStorage.setItem("username", data.theatre_name);
            localStorage.setItem("sessionID", data.sessionID);
            localStorage.setItem("theatre_id", data.theatre_id);
            localStorage.setItem("isTheatre", true);
            history.push("/theatre/dashboard");
            setErr("logged in");
          } else {
            setErr(data.err);
          }
        })
        .catch((err) => {
          alert(err);
        });
        setLoading(false)
      document.getElementById("submitButton").disabled = false;

    } catch (error) {
      setErr(error)
    }
  };

  const submitHandler = (e) => {
    console.log("Form submitted")
    e.preventDefault();
    if (!loading) {
      // console.log("setting loading to true");
      // setLoading(true);
      makeRequest();
      // setLoading(false);
    }
  };
  return (
    <div>
      <NavBar searchBar={true} theatreNavBar={true} />
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
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "SignIn"
            )}
          </Button>
          <Button variant="link">Not registered? Register Here.</Button>
        </Form>
      </div>
    </div>
  );
}

export default TheatreLogin;
