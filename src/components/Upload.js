import React, { useState } from "react";
import app from "../base";
import FileUploader from "react-firebase-file-uploader";
import file from "../svg/file.png";
import { Link } from "react-router-dom";
import {
  ProgressBar,
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

const Upload = () => {
  const [tagname, setTagName] = useState(null);
  const [filenames, setfilenames] = useState([]);
  const [files, setfiles] = useState([]);
  const [downloadURLs, setdownloadURLs] = useState([]);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [showx, setShow] = useState("none");
  const [nones, setNones] = useState("none");
  const [nonesx, setNonesx] = useState("none");
  const [mones, setMones] = useState("none");
  const [shows, setShows] = useState(false);
  const [reqModal, setRequestModal] = useState(false);
  const [reqModalSuccess, setReqModalSuccess] = useState(false);
  const [pending, setPending] = useState("none");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = React.useState();
  const [user, setUser] = useState("");
  const [uid, setUID] = useState("");
  const [notis, setNotis] = useState([]);
  const [reqTags, setReqTags] = useState([]);
  const [shows1, setShows1] = useState(false);

  React.useEffect(() => {
    const uid = app.auth().currentUser.uid;
    const db = app.firestore();
    db.collection("users")
      .where("uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUser(doc.data().name);
          setUID(doc.data().uid);
        });
      });
  }, []);

  const handleClose = () => {
    setShows(false);
    setShows1(false);
    setRequestModal(false);
    setReqModalSuccess(false);
  };
  const handleShow = () => setShows(true);

  const handleChange = (e) => {
    setTagName(e.target.value);
  };

  const finaliseStuff = () => {
    if (filenames.length === 0) {
      console.log("000");
      setShows1(true);
    } else {
      const db = app.firestore();
      db.collection("tags")
        .where("name", "==", tagname)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection("tags").doc(doc.id).update({});
          });
        });
      handleShow();
    }
  };

  const checkBase = () => {
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
          app
            .firestore()
            .collection("tags")
            .where("name", "==", tagname)
            .get()
            .then(function (querySnapshotx) {
              querySnapshot.forEach(function (doc) {
                console.log(doc.data());
                if (doc.data().access === "2") {
                  if (uid === doc.data().owner) {
                    setMones("block");
                    setNones("none");
                    setNonesx("none");
                    setShow("block");
                    owner.concat("(You)");
                    getOwner();
                  } else {
                    const db = app.firestore();
                    db.collection("tags")
                      .where("name", "==", tagname)
                      .get()
                      .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          setNotis(doc.data().requests);
                          setReqTags(doc.data().reqTags);
                        });
                      });
                    setNonesx("block");
                    setMones("none");
                    setShow("none");
                  }
                }
              });
            });
          setMones("block");
          setNones("none");
          setNonesx("none");
          setShow("block");
        } else {
          setNones("block");
          setNonesx("none");
          setMones("none");
          setShow("none");
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    getOwner();
  };

  const getOwner = async () => {
    const db = app.firestore();
    await db
      .collection("tags")
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
                if (uid === doc.data().uid) {
                  setOwner(doc.data().name + " ( You )");
                } else setOwner(doc.data().name);
              });
            });
        });
      });
  };

  const eCheckBase = (e) => {
    if (e.key === "Enter") {
      checkBase();
    }
  };
  const handleUploadStart = (filename) => {
    setfiles((files) => [...files, filename.name]);
    setuploadProgress(0);
  };

  const handleProgress = (progress) => {
    setuploadProgress(progress);
  };

  const handleUploadError = (error) => {
    console.log(error);
  };

  const handleUploadSuccess = async (filename) => {
    const downloadURL = await app
      .storage()
      .ref(`${tagname}`)
      .child(filename)
      .getDownloadURL();

    setfilenames((filenames) => [...filenames, filename]);
    setdownloadURLs((downloadURLs) => [...downloadURLs, downloadURL]);
    setuploadProgress(100);
  };

  const requestAccess = () => {
    const db = app.firestore();
    db.collection("tags")
      .where("name", "==", tagname)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.data().requests.includes(uid)) {
            setRequestModal(true);
          } else {
            const db = app.firestore();
            db.collection("tags")
              .where("name", "==", tagname)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  notis.push(uid);
                  reqTags.push(tagname);
                  db.collection("tags").doc(doc.id).update({
                    requests: notis,
                    reqTags: reqTags,
                  });
                });
              });
            setReqModalSuccess(true);
          }
        });
      });
  };

  return (
    <div>
      <div className="w-50 mx-auto" id="mobile">
        <FormLabel
          style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
        >
          <b>Tag Name</b>
        </FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            style={{
              height: "40px",
              backgroundColor: "#363636",
              border: "none",
              color: "white",
              outline: "none",
              fontWeight: "bold",
            }}
            placeholder="Tag Name"
            aria-label="Tag Name"
            aria-describedby="basic-addon2"
            onChange={(e) => handleChange(e)}
            onKeyPress={eCheckBase}
          />
          <InputGroup.Append>
            <Button
              style={{ color: "#121212", fontWeight: "bold" }}
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
          }}
        >
          Oops! The tag doesn't exist
        </Alert>
        <Alert
          style={{
            display: `${nonesx}`,
            backgroundColor: "#4d1a1a",
            color: "white",
          }}
        >
          You don't have permission
          <br />
          <Button
            size="sm"
            className="mt-3 mb-3"
            style={{
              backgroundColor: "#300606",
              border: "none",
              color: "#ffd9d9",
              padding: 10,
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={requestAccess}
          >
            Request Access
          </Button>
        </Alert>
        <Alert
          style={{
            display: `${mones}`,
            backgroundColor: "#163813",
            color: "white",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: "bold", color: "#abffb2" }}>
              Looks Good. Start uploading files below.
            </p>
            <p>
              Tag Name : <b style={{ color: "#abffb2" }}>{tagname}</b>
            </p>
            <p>
              Owner: <b style={{ color: "#abffb2" }}>{owner}</b>
            </p>
            <p style={{ textAlign: "" }}>
              Description: <b style={{ color: "#abffb2" }}>{description}</b>
            </p>
          </div>
        </Alert>
      </div>
      <div
        style={{
          display: `${showx}`,
          border: "2px dashed rgb(70, 204, 57, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
        className="w-50 mx-auto"
        id="mobile"
      >
        <label
          style={{
            backgroundColor: "#5dea51",
            color: "#121212",
            padding: 10,
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Choose Files
          <FileUploader
            accept="*"
            name="image-uploader-multiple"
            storageRef={app.storage().ref(`${tagname}`)}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            filename={(file) => file.name.split(".")[0] + "-" + user}
            multiple
            style={{ display: "none" }}
          />
        </label>

        <p
          style={{
            color: "#b2d1c1",
            fontWeight: "bold",
            fontSize: "18px",
          }}
          className="my-3 mb-4"
        >
          Progress: {uploadProgress}%
        </p>
        <ProgressBar
          striped
          variant="success"
          now={uploadProgress}
          style={{ backgroundColor: "#363636" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "right",
          }}
        >
          <CardDeck>
            {files.map(function (name, index) {
              return (
                <a
                  href={`${downloadURLs[index]}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    style={{
                      backgroundColor: "#363636",
                      width: "10rem",
                      marginTop: "20px",
                    }}
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
          <Modal.Header
            style={{
              backgroundColor: "#363535",
              color: "#54ff57",
              border: "none",
            }}
          >
            <Modal.Title>
              <b>Files Uploaded!</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            Your files have been uploaded. The owner can now view your files.
          </Modal.Body>

          <Modal.Footer
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            <Link to="./">
              <Button
                id="cusbtn"
                variant="secondary"
                onClick={handleClose}
                style={{ color: "#121212", fontWeight: "bold" }}
              >
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
          <Modal.Header
            style={{
              backgroundColor: "#363535",
              color: "#ff3b3b",
              border: "none",
            }}
          >
            <Modal.Title>
              <b>No Files :(</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            Please add some files by clicking on "Choose Files"
          </Modal.Body>

          <Modal.Footer
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            <Button
              id="cusbtn"
              variant="secondary"
              onClick={handleClose}
              style={{ color: "#121212", fontWeight: "bold" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={reqModal}
          onHide={handleClose}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            style={{
              backgroundColor: "#363535",
              color: "#ff3b3b",
              border: "none",
            }}
          >
            <Modal.Title>
              <b>Request Already Sent</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            Please wait till the owner approves your request.
          </Modal.Body>

          <Modal.Footer
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            <Button
              id="cusbtn"
              variant="secondary"
              onClick={handleClose}
              style={{ color: "#121212", fontWeight: "bold" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={reqModalSuccess}
          onHide={handleClose}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            style={{
              backgroundColor: "#363535",
              color: "#54ff57",
              border: "none",
            }}
          >
            <Modal.Title>
              <b>Request Sent</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            Please wait till the owner approves your request.
          </Modal.Body>

          <Modal.Footer
            style={{
              backgroundColor: "#363535",
              color: "white",
              border: "none",
            }}
          >
            <Button
              id="cusbtn"
              variant="secondary"
              onClick={handleClose}
              style={{ color: "#121212", fontWeight: "bold" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          className="mt-3"
          variant="primary"
          id="cusbtn"
          onClick={finaliseStuff}
          style={{ color: "#121212", fontWeight: "bold" }}
        >
          Finalise
        </Button>
        {/*<div>
        {downloadURLs.map((downloadURL, i) => {
          return <img key={i} src={downloadURL} alt="" />;
        })}
      </div*/}
      </div>
    </div>
  );
};

export default Upload;
