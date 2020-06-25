import React from "react";
import app from "../base";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import prof from "../svg/prof.png";
import noti from "../svg/noti.png";

const Header = () => {
  const [activeH, setActiveH] = React.useState("activeFalse");
  const [activeC, setActiveC] = React.useState("activeFalse");
  const [activeU, setActiveU] = React.useState("activeFalse");
  const [activeM, setActiveM] = React.useState("activeFalse");
  const [user, setUser] = React.useState("");
  const [notis, setNotis] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [reqTags, setReqTags] = React.useState([]);
  const [finalReq, setFinalReq] = React.useState([""]);

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
    const uid = app.auth().currentUser.uid;
    const db = app.firestore();
    db.collection("tags")
      .where("owner", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {});
      });
  }, []);

  React.useEffect(() => {
    const uid = app.auth().currentUser.uid;
    const db = app.firestore();
    db.collection("users")
      .where("uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUser(doc.data().name);
          setNotis(doc.data.notis);
        });
      });
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
              id="headP"
              onClick={() => {
                app.auth().signOut();
              }}
            >
              Sign Out
            </Nav.Link>
          </Nav>
          {/*<Nav>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-menu-align-right"
                style={{ backgroundColor: "rgb(84, 210, 73)", border: "none" }}
              >
                <img src={noti} style={{ marginBottom: "3px" }}></img>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>*/}

          <Nav>
            <p id="headP" style={{ float: "right" }}>
              {user}{" "}
              <span style={{ paddingLeft: "3px" }}>
                <img src={prof} style={{ paddingBottom: "2px" }}></img>
              </span>
            </p>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
