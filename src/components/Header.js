import React from "react";
import app from "../base";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [activeH, setActiveH] = React.useState("activeFalse");
  const [activeC, setActiveC] = React.useState("activeFalse");
  const [activeU, setActiveU] = React.useState("activeFalse");
  const [activeM, setActiveM] = React.useState("activeFalse");

  React.useEffect(() => {
    if (window.location.href.toString().includes("create", 1)) {
      setActiveC("activeTrue");
    } else if (window.location.href.toString().includes("upload", 1)) {
      setActiveU("activeTrue");
    } else if (window.location.href.toString().includes("manage", 1)) {
      setActiveM("activeTrue");
    } else {
      setActiveH("activeTrue");
    }
  }, []);

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#54D249", color: "#121212" }}
        expand="lg"
        variant="dark"
        className="font-weight-bold mb-5"
      >
        <Navbar.Brand
          id="headT"
          href="./"
          style={{
            fontSize: "1.5rem",
            color: "#121212",
            fontWeight: "bold",
            padding: "0px",
          }}
        >
          Tggr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link style={{ textDecoration: "none" }} to="/">
              <p id="headP" className={activeH}>
                Home
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="./create">
              <p id="headP" className={activeC}>
                Create
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="./upload">
              <p id="headP" className={activeU}>
                Upload
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="./manage">
              <p id="headP" className={activeM}>
                Manage
              </p>
            </Link>
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
