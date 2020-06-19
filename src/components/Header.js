import React from "react";
import app from "../base";
import { Navbar, Nav, Image } from "react-bootstrap";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";

const Header = () => {
  return (
    <div>
      <PrivateRoute path="/create" component={Home} />
      <PrivateRoute exact path="/upload" component={Home} />
      <PrivateRoute exact path="/manage" component={Home} />
      <Navbar
        style={{ backgroundColor: "#54D249" }}
        expand="lg"
        variant="dark"
        className="font-weight-bold mb-5"
      >
        <Navbar.Brand href="#home" style={{ fontSize: "1.5rem" }}>
          Tggr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
            <Nav.Link href="/manage">Manage</Nav.Link>
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
