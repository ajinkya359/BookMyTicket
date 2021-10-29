import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Register.css";
const axios = require("axios");
const backend_url = require("../Server/BackEndConnect/backEndUrl");

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      err: "",
      firstName: "",
      lastName: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({
      firstName: event.target.value,
    });
    //   console.log(this.state.firstNa.me)
  }
  handleLastnameChange(event) {
    this.setState({
      lastName: event.target.value,
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const details = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    console.log(details);
    const url = backend_url + "/register/user";
    console.log(url);
    axios
      .post(url, details)
      .then((response) => {
        console.log(response.data);
        if (response.data.registered === false) {
          this.setState({
            err: response.data.err,
          });
        } else {
          this.setState({
            err: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(JSON.stringify(details))
  }
  render() {
    return (
      <div className="signIn">
        <h6 style={{ color: "red" }}>{this.state.err}</h6>
        <Form className="form" onSubmit={this.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={this.handleFirstNameChange}
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="eg-:Donald"
              //   onChange={this.change}
            />
            <Form.Text className="text-muted">
              Enter First name here
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={this.handleLastnameChange}
          >
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="eg-:Trump"
              //   onChange={this.change}
            />
            <Form.Text className="text-muted">
              Enter last name here
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={this.handleEmailChange}
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="saveAmericaTheatre@usa.com"
              //   onChange={this.change}
            />
            <Form.Text className="text-muted">Enter your email here.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
            <Form.Text className="text-muted">Enter you password here</Form.Text>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep Me signed In" />
            </Form.Group> */}
          <Button variant="danger" type="submit" id="submitButton">
            SignIN
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
