import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as ReactBootstrap from "react-bootstrap";
import { Button } from "react-bootstrap";
import backEndUrl from "../../Server/BackEndConnect/backEndUrl";
import axios from "axios";
import { changeUser } from "../../Server/database/database_access";
import { Cookie } from "express-session";

const NavBar = (props) => {
  var history = useHistory();
  const [isTheatre, setIsTheatre] = useState(localStorage.getItem("isTheatre"));
  console.log("istheatre",isTheatre)
  const [searchBarStatus, setSearchBarStatus] = useState(
    !("searchBar" in props)
  );
  const [loggedin, changeLoggedInStatus] = useState(
    localStorage.getItem("sessionID") === null ? false : true
  );
  const [username, setusername] = useState(localStorage.getItem("username"));
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

  const handleSignInClick = () => {
    history.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = (e) => {
    if (!isTheatre) {
      console.log("user")
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
      console.log("theatre")
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
      {console.log("search bar", searchBarStatus)}
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
            <Button
              variant="dark"
              style={{
                margin: "0 0.25vw",
                display: loggedin === false ? "visible" : "none",
              }}
              onClick={handleSignInClick}
            >
              Login
            </Button>
            <div
              // variant="blank"
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
            >
              Contact Us
            </Button>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  );
};

export default NavBar;
