import React from "react";
import app from "../base";
import { Navbar, Form, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#54D249" }}
        expand="lg"
        variant="dark"
        className="font-weight-bold"
      >
        <Navbar.Brand href="#home" style={{ fontSize: "1.5rem" }}>
          Tggr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="./" style={{ textDecoration: "none" }}>
              <Nav.Link href="#home">Home</Nav.Link>
            </Link>
            <Nav.Link href="#link" style={{}}>
              Link
            </Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="./create" className="font-weight-bold">
                Create
              </NavDropdown.Item>
              <NavDropdown.Item href="./upload" className="font-weight-bold">
                Upload
              </NavDropdown.Item>
              <NavDropdown.Item href="./manage" className="font-weight-bold">
                Manage
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="font-weight-bold">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() => {
                app.auth().signOut();
              }}
            >
              Sign Out
            </Nav.Link>
          </Nav>
          <Image
            src="https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg"
            roundedCircle
            width="40px"
          />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
