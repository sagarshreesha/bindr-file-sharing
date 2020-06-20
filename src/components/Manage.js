import React, { useState } from "react";
import app from "../base";
import file from "../svg/file.png";
import { Link } from "react-router-dom";
import {
  Button,
  InputGroup,
  FormControl,
  FormLabel,
  Alert,
  Card,
  CardDeck,
  Modal,
  Spinner,
  Fade,
} from "react-bootstrap";
import "../util.css";

const Manage = () => {
  const [tagname, setTagName] = useState(null);
  const [files, setfiles] = useState([]);
  const [dates, setdates] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [downloadURLs, setdownloadURLs] = useState([]);
  const [show, setShow] = useState("none");
  const [nones, setNones] = useState("none");
  const [mones, setMones] = useState("none");
  const [shows, setShows] = useState(false);
  const [pending, setPending] = useState("none");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = React.useState();
  const [empty, setEmpty] = useState("none");
  const [nempty, setnEmpty] = useState("block");

  const [shows1, setShows1] = useState(false);

  React.useEffect(() => {
    const uid = app.auth().currentUser.uid;
    const db = app.firestore();
    db.collection("users")
      .where("uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {});
      });
    db.collection("tags")
      .where("owner", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setMyTags((mytags) => [...mytags, doc.data().name]);
        });
      });
  }, []);

  const [mytags, setMyTags] = useState([]);

  const handleClose = () => {
    setShows(false);
    setShows1(false);
  };

  const handleChange = (e) => {
    setTagName(e.target.value);
  };

  const checkBase = () => {
    setEmpty("none");
    setnEmpty("block");
    setNones("none");
    setMones("none");
    setShow("none");
    setPending("block");
    app
      .firestore()
      .collection("tags")
      .where("name", "==", tagname)
      .get()
      .then(function (querySnapshot) {
        setPending("none");
        if (!querySnapshot.empty) {
          setMones("block");
          setNones("none");
          setShow("block");
        } else {
          setNones("block");
          setMones("none");
          setShow("none");
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    getOwner();
  };

  const getOwner = () => {
    const db = app.firestore();
    db.collection("tags")
      .where("name", "==", tagname)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setDescription(doc.data().desc);
          db.collection("users")
            .where("uid", "==", doc.data().owner)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                setOwner(doc.data().name);
              });
            });
        });
      });

    getFiles();
  };

  const getFiles = () => {
    setfiles([]);
    setdownloadURLs([]);
    app
      .storage()
      .ref(`${tagname}`)
      .listAll()
      .then(function (result) {
        if (!result.items[0]) {
          setEmpty("block");
          setnEmpty("none");
        }
        result.items.forEach(function (imageRef) {
          console.log(imageRef);
          app
            .storage()
            .ref(imageRef.fullPath)
            .getDownloadURL()
            .then(function (url) {
              app
                .storage()
                .ref(imageRef.fullPath)
                .getMetadata()
                .then(function (metadata) {
                  setdownloadURLs((downloadURLs) => [...downloadURLs, url]);
                  setfiles((files) => [...files, imageRef.name]);
                  setdates((dates) => [...dates, metadata.timeCreated]);
                  setsizes((sizes) => [...sizes, metadata.size]);
                });
            });
        });
      })
      .catch(function (error) {
        // Handle any errors
      });
  };

  const getCorrectDate = (datex) => {
    let date = new Date(datex);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return dt + "-" + month + "-" + year;
  };

  const getSize = (bytes) => {
    var sizesx = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + " " + sizesx[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizesx[i];
  };

  const eCheckBase = (e) => {
    if (e.key === "Enter") {
      checkBase();
    }
  };

  const myClick = (name) => {
    setEmpty("none");
    setTagName(name);
    setNones("none");
    setMones("none");
    setShow("none");
    setPending("block");
    app
      .firestore()
      .collection("tags")
      .where("name", "==", name)
      .get()
      .then(function (querySnapshot) {
        setPending("none");
        if (!querySnapshot.empty) {
          setMones("block");
          setNones("none");
          setShow("block");
        } else {
          setNones("block");
          setMones("none");
          setShow("none");
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    const db = app.firestore();
    db.collection("tags")
      .where("name", "==", name)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setDescription(doc.data().desc);
          db.collection("users")
            .where("uid", "==", doc.data().owner)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                setOwner(doc.data().name);
              });
            });
        });
      });

    setfiles([]);
    setdownloadURLs([]);
    app
      .storage()
      .ref(`${name}`)
      .listAll()
      .then(function (result) {
        if (!result.items[0]) {
          setEmpty("block");
          setnEmpty("none");
        } else {
          setnEmpty("block");
          result.items.forEach(function (imageRef) {
            console.log("sup");
            app
              .storage()
              .ref(imageRef.fullPath)
              .getDownloadURL()
              .then(function (url) {
                app
                  .storage()
                  .ref(imageRef.fullPath)
                  .getMetadata()
                  .then(function (metadata) {
                    console.log(metadata);
                    setdownloadURLs((downloadURLs) => [...downloadURLs, url]);
                    setfiles((files) => [...files, imageRef.name]);
                    setdates((dates) => [...dates, metadata.timeCreated]);
                    setsizes((sizes) => [...sizes, metadata.size]);
                  });
              });
          });
        }
      })
      .catch(function (error) {
        // Handle any errors
      });
  };

  return (
    <div>
      <div>
        <div className="my-tags w-100" style={{ marginTop: "-20px" }}>
          <ul class="hs full no-scrollbar font-weight-bold">
            <p
              class="recent mb-2"
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#929493",
                textAlign: "left",
              }}
            >
              My Tags
            </p>
            {mytags.map(function (name, index) {
              return (
                <li key={index} class="item">
                  <Button
                    onClick={() => myClick(name)}
                    style={{
                      backgroundColor: "#363636",
                      outline: "none",
                      border: " 2px solid #363636",
                      fontWeight: "bold",
                      width: "100%",
                      borderRadius: "999px",
                      height: "40px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      color: "#e2e2e2",
                      fontSize: "15px",
                    }}
                    className="tagbtn"
                  >
                    {name}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <FormLabel
          style={{
            color: "#929493",
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "1.5rem",
          }}
        >
          <b>Tag Name</b>
        </FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            style={{
              backgroundColor: "#363636",
              border: "none",
              color: "white",
              outline: "none",
              fontWeight: "bold",
              height: "40px",
            }}
            placeholder="Tag Name"
            aria-label="Tag Name"
            aria-describedby="basic-addon2"
            onChange={(e) => handleChange(e)}
            onKeyPress={eCheckBase}
          />
          <InputGroup.Append>
            <Button
              style={{ outline: "none", color: "#121212", fontWeight: "bold" }}
              id="cusbtn"
              onClick={checkBase}
            >
              <b>Check</b>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Spinner
          style={{ display: `${pending}` }}
          animation="border"
          variant="success"
          className="mx-auto my-3"
        />
        <Alert
          style={{
            display: `${nones}`,
            backgroundColor: "#4d1a1a",
            color: "white",
            border: "none",
          }}
          variant="danger"
        >
          Oops! The tag doesn't exist
        </Alert>
        <Alert
          style={{
            display: `${mones}`,
            backgroundColor: "#163813",
            color: "white",
            border: "none",
          }}
          variant="success"
        >
          <p style={{ textAlign: "left" }}>
            <p>
              Tag Name : <b style={{ color: "#abffb2" }}>{tagname}</b>
            </p>
            <p>
              Owner: <b style={{ color: "#abffb2" }}>{owner}</b>
            </p>
            <p style={{ textAlign: "left" }}>
              Description: <b style={{ color: "#abffb2" }}>{description}</b>
            </p>
          </p>
        </Alert>
      </div>
      <div
        style={{
          display: `${show}`,
          border: "2px dashed rgb(70, 204, 57, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div style={{}}>
          <h3
            style={{
              display: `${empty}`,
              fontWeight: "bold",
              color: "#e63535",
            }}
          >
            No Files!
          </h3>
          <h3
            style={{
              display: `${nempty}`,
              color: "#929493",
              fontWeight: "bold",
              marginLeft: "5px",
              marginBottom: "15px",
            }}
          >
            All files
          </h3>
          <CardDeck
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))",
              gridGap: "1.5rem",
            }}
          >
            {files.map(function (name, index) {
              return (
                <Card
                  className="shadow"
                  id="mcard"
                  style={{ backgroundColor: "#282828" }}
                  onClick={() => window.open(`${downloadURLs[index]}`)}
                >
                  <Card.Img
                    className="mx-auto mt-3"
                    variant="top"
                    src={file}
                    style={{ width: "4rem", justifyContent: "center" }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="mt-0 mb-0"
                      style={{ color: "#b2d1c1", fontSize: "16px" }}
                    >
                      <b>{name}</b>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      backgroundColor: "#292e29",
                      color: "#b2d1c1",
                      padding: "15px 15px 0px 15px",
                    }}
                  >
                    <p style={{ float: "left" }}>
                      {getCorrectDate(dates[index])}
                    </p>
                    <p style={{ float: "right", fontWeight: "bold" }}>
                      {getSize(sizes[index])}
                    </p>
                  </Card.Footer>
                </Card>
              );
            })}
          </CardDeck>
        </div>
        <Modal
          show={shows}
          onHide={handleClose}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          transition={Fade}
          backdropTransition={Fade}
        >
          <Modal.Header>
            <Modal.Title>
              <b>Files Uploaded!</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Your files have been uploaded. The owner can now view your files.
          </Modal.Body>

          <Modal.Footer>
            <Link to="./">
              <Button id="cusbtn" variant="secondary" onClick={handleClose}>
                Go Home
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>

        <Modal
          show={shows1}
          onHide={handleClose}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <b>No Files :(</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Please add some files by clicking on "Choose Files"
          </Modal.Body>

          <Modal.Footer>
            <Button id="cusbtn" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/*<div>
        {downloadURLs.map((downloadURL, i) => {
          return <img key={i} src={downloadURL} alt="" />;
        })}
      </div*/}
      </div>
    </div>
  );
};

export default Manage;
