import React from "react";
import app from "../base";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import prof from "../svg/prof.png";
import noti from "../svg/noti.png";
import firebase from "firebase";

const Header = () => {
  const [activeC, setActiveC] = React.useState("activeFalse");
  const [activeU, setActiveU] = React.useState("activeFalse");
  const [activeM, setActiveM] = React.useState("activeFalse");
  const [user, setUser] = React.useState("");
  const [reqTags, setReqTags] = React.useState([]);
  const [reqNames, setReqNames] = React.useState([]);
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    if (window.location.href.toString().includes("create", 1)) {
      setActiveC("activeTrue");
    } else if (window.location.href.toString().includes("upload", 1)) {
      setActiveU("activeTrue");
    } else if (window.location.href.toString().includes("manage", 1)) {
      setActiveM("activeTrue");
    }
    const uid = app.auth().currentUser.uid;
    const db = app.firestore();
    db.collection("tags")
      .where("owner", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          for (let index = 0; index < doc.data().reqTags.length; index++) {
            setReqTags((reqTags) => [...reqTags, doc.data().reqTags[index]]);
          }

          for (let index = 0; index < doc.data().reqNames.length; index++) {
            setReqNames((reqNames) => [
              ...reqNames,
              doc.data().reqNames[index],
            ]);
          }

          for (let index = 0; index < doc.data().requests.length; index++) {
            setRequests((requests) => [
              ...requests,
              doc.data().requests[index],
            ]);
          }
        });
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
        });
      });
  }, []);

  const acceptReq = (index) => {
    if (reqTags) {
    }
    const db = app.firestore();
    let tagString = reqNames[index];
    let tag = tagString.split(" ").splice(-1);
    console.log(tag[0]);
    db.collection("tags")
      .where("name", "==", tag[0])
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var ref = db.collection("tags").doc(doc.id);
          ref.update({
            users: firebase.firestore.FieldValue.arrayUnion(requests[index]),
          });
          ref.update({
            requests: firebase.firestore.FieldValue.arrayRemove(
              requests[index]
            ),
            reqNames: firebase.firestore.FieldValue.arrayRemove(
              reqNames[index]
            ),
          });
        });
      });
    document.getElementById(index + "sup").style.display = "none";
  };

  const rejectReq = (index) => {
    const db = app.firestore();
    let tagString = reqNames[index];
    let tag = tagString.split(" ").splice(-1);
    console.log(tag[0]);
    db.collection("tags")
      .where("name", "==", tag[0])
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var ref = db.collection("tags").doc(doc.id);
          ref.update({
            requests: firebase.firestore.FieldValue.arrayRemove(
              requests[index]
            ),
            reqNames: firebase.firestore.FieldValue.arrayRemove(
              reqNames[index]
            ),
          });
        });
      });
    document.getElementById(index + "sup").style.display = "none";
  };

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
          <p
            style={{
              fontSize: "10px",
              padding: "0px",
              margin: "-10px 0px 0px 45px",
              fontWeight: "normal",
            }}
          >
            Beta
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
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
          <Nav>
            <Dropdown drop="left">
              <Dropdown.Toggle
                style={{ backgroundColor: "rgb(84, 210, 73)", border: "none" }}
              >
                <img
                  alt="notification"
                  src={noti}
                  style={{ marginBottom: "0px", width: "24px" }}
                ></img>
                <svg
                  height="15"
                  width="15"
                  style={{
                    display: `${reqNames.length > 0 ? "block" : "none"}`,
                    position: "absolute",
                    left: "13px",
                    top: "10px",
                  }}
                >
                  <circle cx="5" cy="5" r="3.5" fill="red" />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu id="notidd">
                <Dropdown.Item
                  style={{
                    textAlign: "left",
                    padding: "0.5rem 1rem 1rem 1rem",
                    marginBottom: "5px",
                    display: `${reqNames.length > 0 ? "none" : "block"}`,
                  }}
                  id="dditem"
                >
                  <p
                    style={{
                      margin: "0px",
                      padding: "10px 0px 0px 5px",
                      fontWeight: "bold",
                    }}
                  >
                    No new notifications !
                  </p>
                </Dropdown.Item>
                {reqNames.map(function (name, index) {
                  return (
                    <div key={index} id={index + "sup"}>
                      <div>
                        <Dropdown.Item
                          style={{
                            textAlign: "left",
                            padding: "0.5rem 1rem 1rem 1rem",
                            marginBottom: "5px",
                          }}
                          id="dditem"
                        >
                          {reqNames[index]}

                          <center>
                            <div className="mt-3">
                              <Button
                                size="sm"
                                className="mr-5"
                                style={{
                                  borderRadius: "999px",
                                  padding: "0.5rem 0.75rem 0.5rem 0.75rem",
                                  backgroundColor: "#abe4a5",
                                  border: "none",
                                  color: "#106e06",
                                  fontWeight: "bold",
                                }}
                                onClick={function () {
                                  acceptReq(index);
                                }}
                              >
                                Accept
                              </Button>
                              <Button
                                style={{
                                  borderRadius: "999px",
                                  padding: "0.5rem 0.75rem 0.5rem 0.75rem",
                                  backgroundColor: "#dd9d9d",
                                  border: "none",
                                  color: "#7a1313",
                                  fontWeight: "bold",
                                }}
                                size="sm"
                                onClick={function () {
                                  rejectReq(index);
                                }}
                              >
                                Reject
                              </Button>
                            </div>
                          </center>
                        </Dropdown.Item>
                      </div>
                    </div>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

          <Nav>
            <p id="headP" style={{ float: "right" }}>
              {user}{" "}
              <span style={{ paddingLeft: "3px" }}>
                <img
                  alt="profile_pic"
                  src={prof}
                  style={{ paddingBottom: "2px", width: "20px" }}
                ></img>
              </span>
            </p>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
