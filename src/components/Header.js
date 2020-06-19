import React from "react";
import app from "../base";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#54D249", color: "#121212" }}
        expand="lg"
        variant="dark"
        className="font-weight-bold mb-5"
      >
        <Navbar.Brand
          href="./"
          style={{ fontSize: "1.5rem", color: "#121212", fontWeight: "bold" }}
        >
          Tggr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" style={{ color: "#121212" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/create" style={{ color: "#121212" }}>
              Create
            </Nav.Link>
            <Nav.Link href="/upload" style={{ color: "#121212" }}>
              Upload
            </Nav.Link>
            <Nav.Link href="/manage" style={{ color: "#121212" }}>
              Manage
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                app.auth().signOut();
              }}
            >
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
