import React, {useState } from "react";
import { useHistory, useLocation } from "react-router";
import * as ReactBootstrap from "react-bootstrap";
import { Button } from "react-bootstrap";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const NavBar = (props) => {
  const location=useLocation()
  var history = useHistory();
  const isTheatre = localStorage.getItem("isTheatre");
  const theatreNavBar = "theatreNavBar" in props ? props.theatreNavBar : false;
  console.log("istheatre", isTheatre);
  const searchBarStatus=!("searchBar" in props);
  const [loggedin, changeLoggedInStatus] = useState(
    localStorage.getItem("sessionID") === null ? false : true
  );
  const username = localStorage.getItem("username");
  console.log(localStorage.getItem("username"));
  const searchHandler = (event) => {
    event.preventDefault();
    props.setSearchValue((prevValue) => {
      return {
        ...prevValue,
        status: true,
      };
    });
  };

  const handleClick = () => {
    history.push(`/`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = (e) => {
    if (!isTheatre) {
      console.log("user");
      const url = backEndUrl + "/users/logout";
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          localStorage.clear();
          history.push("/login");
          changeLoggedInStatus(false);
        })
        .catch((err) => {
          alert(err);
          localStorage.clear();
          history.push("/login");
        });
    } else {
      console.log("theatre");
      const url = backEndUrl + "/theatres/logout";
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          localStorage.clear();
          history.push("/theatre/login");
          changeLoggedInStatus(false);
        })
        .catch((err) => {
          alert(err);
          localStorage.clear();
          history.push("/theatre/login");
        });
    }
  };
  return (
    <ReactBootstrap.Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
    >
      {console.log("theatreNavBar", theatreNavBar)}
      <ReactBootstrap.Container>
        <ReactBootstrap.Navbar.Brand href="#home" onClick={handleClick}>
          BookMyTicket
        </ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootstrap.Nav className="me-auto">
            <ReactBootstrap.Form
              className="d-flex"
              style={{ visibility: searchBarStatus ? "visible" : "hidden" }}
              onSubmit={handleSubmit}
            >
              <ReactBootstrap.FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onBlur={(event) => {
                  props.setSearchValue({
                    value: event.target.value,
                    status: false,
                  });
                }}
              />
              <ReactBootstrap.Button
                variant="outline-success"
                onClick={searchHandler}
              >
                Search
              </ReactBootstrap.Button>
            </ReactBootstrap.Form>
          </ReactBootstrap.Nav>
          <ReactBootstrap.Nav>
            <div
              style={{
                display: loggedin === true ? "visible" : "none",
                color: "white",
                margin: "0.5vw 0",
              }}
            >
              {username}
            </div>
            <Button
              variant="danger"
              onClick={handleLogout}
              style={{
                display: loggedin === true ? "visible" : "none",
                margin: "0 1vw",
              }}
            >
              Logout
            </Button>
            <Button
              variant="dark"
              style={{
                margin: "0 0.25vw",
                display: !loggedin ? "visible" : "none",
              }}
            >
              About Us
            </Button>
            <Button
              variant="dark"
              style={{
                margin: "0 0.25vw",
                display: !loggedin ? "visible" : "none",
              }}
              onClick={()=>history.push('/contactUs')}
            >
              Contact Us
            </Button>
            <Dropdown
              style={{
                display: !theatreNavBar && !loggedin ? "visible" : "none",
                margin: "0 0.5vw",
              }}
            >
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
              >
                Theatre?
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="/theatre/login">
                  Theatre Login
                </Dropdown.Item>
                <Dropdown.Item href="/theatre/register">
                  Theatre Register
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              style={{
                display: theatreNavBar && !loggedin ? "visible" : "none",
                margin: "0 0.5vw",
              }}
            >
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
              >
                User?
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="/login">User Login</Dropdown.Item>
                <Dropdown.Item href="/register">User Register</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="primary"
              style={{
                display:
                  isTheatre &&
                  loggedin &&
                  location.pathname !== "/theatre/dashboard"
                    ? "visible"
                    : "none",
              }}
              onClick={() => {
                if (!location.pathname !== "/theatre/dashboard")
                  history.push("/theatre/dashboard");
              }}
            >
              Dashboard
            </Button>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  );
};

export default NavBar;
