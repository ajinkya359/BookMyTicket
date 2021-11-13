import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as ReactBootstrap from "react-bootstrap";
import { Button } from "react-bootstrap";

const NavBar = (props) => {
  var history = useHistory();
  const [searchBarStatus, setSearchBarStatus] = useState(true);
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
    // console.log("Home page")
    history.push(`/`);
  };

  const handleSignInClick = () => {
    history.push("/sign_in");
  };
  useEffect(() => {
    setSearchBarStatus(!("searchBar" in props));
  }, []);
  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <ReactBootstrap.Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
    >
      {}
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
              style={{ margin: "0 0.25vw" }}
              onClick={handleSignInClick}
            >
              Login
            </Button>
            <Button variant="dark" style={{ margin: "0 0.25vw" }}>
              About Us
            </Button>
            <Button variant="dark" style={{ margin: "0 0.25vw" }}>
              Contact Us
            </Button>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  );
};

export default NavBar;
