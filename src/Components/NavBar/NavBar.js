import React from "react";
import { useHistory } from "react-router";
import * as ReactBootstrap from "react-bootstrap";

const NavBar = (props) => {
  var history = useHistory();

  const searchHandler = (event) => {
    event.preventDefault();
    props.setSearchValue((prevValue) => {
      return {
        ...prevValue,
        status: true,
      };
    });
  };

  const handleClick=()=>{
    // console.log("Home page")
  history.push(`/`);
  }
  return (
    <ReactBootstrap.Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
    >
      <ReactBootstrap.Container>
        <ReactBootstrap.Navbar.Brand href="#home" onClick={handleClick}>
          BookMyTicket
        </ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootstrap.Nav className="me-auto">
            <ReactBootstrap.Form className="d-flex">
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
            <ReactBootstrap.Nav.Link href="#deets">
              LogIn
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link eventKey={2} href="#memes">
              About Us
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="#deets">
              Contact Us
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  );
};

export default NavBar;
