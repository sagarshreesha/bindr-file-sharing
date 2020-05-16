import React, { useState } from "react";
import app from "../base";
import FileUploader from "react-firebase-file-uploader";
import file from "../file.svg";
import { Link } from "react-router-dom";
import {
  ProgressBar,
  Form,
  Button,
  InputGroup,
  FormControl,
  FormLabel,
  Alert,
  Card,
  CardDeck,
  Modal,
  Spinner,
} from "react-bootstrap";
import "../util.css";

const Upload = () => {
  const [tagname, setTagName] = useState(null);
  const [filenames, setfilenames] = useState([]);
  const [downloadURLs, setdownloadURLs] = useState([]);
  const [isUploading, setisUploading] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [show, setShow] = useState("none");
  const [nones, setNones] = useState("none");
  const [mones, setMones] = useState("none");
  const [shows, setShows] = useState(false);
  const [pending, setPending] = useState("none");

  const [shows1, setShows1] = useState(false);

  const handleClose = () => {
    setShows(false);
    setShows1(false);
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
            db.collection("tags").doc(doc.id).update({
              filenames: filenames,
              urls: downloadURLs,
            });
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
  };

  const eCheckBase = (e) => {
    if (e.key === "Enter") {
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
    }
  };
  const handleUploadStart = () => {
    setisUploading(true);
    setuploadProgress(0);
  };

  const handleProgress = (progress) => {
    setuploadProgress(progress);
  };

  const handleUploadError = (error) => {
    setisUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = async (filename) => {
    const downloadURL = await app
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    setfilenames((filenames) => [...filenames, filename]);
    setdownloadURLs((downloadURLs) => [...downloadURLs, downloadURL]);
    setuploadProgress(100);
    setisUploading(false);
  };

  return (
    <div>
      <div>
        <FormLabel>
          <b>Tag Name</b>
        </FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            style={{ height: "40px" }}
            placeholder="Recipient's username"
            aria-label="Recipient's username"
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
          Looks Good. Start uploading files below.
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
        <label
          style={{
            backgroundColor: "#5dea51",
            color: "white",
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
            storageRef={app.storage().ref("images")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            multiple
            style={{ display: "none" }}
          />
        </label>

        <p show={isUploading}>Progress: {uploadProgress}%</p>
        <ProgressBar now={uploadProgress} />

        <div style={{ display: "flex", marginTop: "30px" }}>
          <CardDeck>
            {filenames.map(function (name, index) {
              return (
                <a
                  href={`${downloadURLs[index]}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card style={{ width: "10rem" }}>
                    <Card.Img
                      className="mx-auto mt-3"
                      variant="top"
                      src={file}
                      style={{ width: "40%", justifyContent: "center" }}
                    />
                    <Card.Body>
                      <Card.Title className="mt-0 mb-0">
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

        <Button
          className="mt-3"
          variant="primary"
          id="cusbtn"
          onClick={finaliseStuff}
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
