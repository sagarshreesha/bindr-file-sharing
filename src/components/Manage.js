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
  const [downloadURLs, setdownloadURLs] = useState([]);
  const [show, setShow] = useState("none");
  const [nones, setNones] = useState("none");
  const [mones, setMones] = useState("none");
  const [shows, setShows] = useState(false);
  const [pending, setPending] = useState("none");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = React.useState();
  const [empty, setEmpty] = useState("none");

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
        if (!result.items[0]) setEmpty("block");
        result.items.forEach(function (imageRef) {
          console.log(imageRef);

          app
            .storage()
            .ref(imageRef.fullPath)
            .getDownloadURL()
            .then(function (url) {
              setdownloadURLs((downloadURLs) => [...downloadURLs, url]);
              setfiles((files) => [...files, imageRef.name]);
            });
        });
      })
      .catch(function (error) {
        // Handle any errors
      });
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
        if (!result.items[0]) setEmpty("block");
        result.items.forEach(function (imageRef) {
          console.log(imageRef);

          app
            .storage()
            .ref(imageRef.fullPath)
            .getDownloadURL()
            .then(function (url) {
              setdownloadURLs((downloadURLs) => [...downloadURLs, url]);
              setfiles((files) => [...files, imageRef.name]);
            });
        });
      })
      .catch(function (error) {
        // Handle any errors
      });
  };

  return (
    <div>
      <div>
        <div className="my-tags mt-5 w-100">
          <ul class="hs full no-scrollbar font-weight-bold">
            <p
              class="recent mb-2"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              My Tags
            </p>
            {mytags.map(function (name, index) {
              return (
                <li key={index} class="item">
                  <a href="." onClick={() => myClick(name)}>
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <FormLabel>
          <b>Tag Name</b>
        </FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            style={{ height: "40px" }}
            placeholder="Tag Name"
            aria-label="Tag Name"
            aria-describedby="basic-addon2"
            onChange={(e) => handleChange(e)}
            onKeyPress={eCheckBase}
          />
          <InputGroup.Append>
            <Button style={{ outline: "none" }} id="cusbtn" onClick={checkBase}>
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
        <Alert style={{ display: `${nones}` }} variant="danger">
          Oops! The tag doesn't exist
        </Alert>
        <Alert style={{ display: `${mones}` }} variant="success">
          <p style={{ textAlign: "left" }}>
            <p>Looks Good. Start uploading files below.</p>
            <p>
              Tag Name : <b>{tagname}</b>
            </p>
            <p>
              Owner: <b>{owner}</b>
            </p>
            <p style={{ textAlign: "" }}>
              Description: <b>{description}</b>
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
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ display: `${empty}` }}>No Files!</h2>
          <CardDeck>
            {files.map(function (name, index) {
              return (
                <a
                  href="."
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                >
                  <Card
                    style={{ width: "10rem" }}
                    onClick={() => window.open(`${downloadURLs[index]}`)}
                  >
                    <Card.Img
                      className="mx-auto mt-3"
                      variant="top"
                      src={file}
                      style={{ width: "4rem", justifyContent: "center" }}
                    />
                    <Card.Body>
                      <Card.Title className="mt-0 mb-0">
                        <b style={{ fontSize: "15px" }}>{name}</b>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </a>
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
