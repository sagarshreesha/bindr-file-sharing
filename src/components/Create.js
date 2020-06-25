import React from "react";
import app from "../base";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Create = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    app
      .firestore()
      .collection("tags")
      .where("name", "==", tagname)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs.length >= 1) {
          setError(true);
        } else {
          const db = app.firestore();
          db.collection("tags").add({
            name: tagname,
            filenames: filename,
            access: access,
            users: users,
            urls: downloadURLs,
            date: date,
            owner: users,
            desc: description,
            requests: [],
            reqTags: [],
          });
          handleShow();
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  React.useEffect(() => {
    setUsers(app.auth().currentUser.uid);
  }, []);

  const [tagname, setTagName] = React.useState(null);
  const [filename] = React.useState([]);
  const [access, setAccess] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [downloadURLs] = React.useState([]);
  const [date] = React.useState(new Date());
  const [description, setDescription] = React.useState();

  const handleClose = () => {
    setShow(false);
  };

  const handleError = () => {
    setError(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div id="formid" className="w-50 mx-auto">
      <Form className="font-weight-bold" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label
            style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
          >
            Tag Name
          </Form.Label>
          <Form.Control
            style={{
              backgroundColor: "#363636",
              border: "none",
              color: "white",
              outline: "none",
              fontWeight: "bold",
            }}
            name="tagname"
            type="text"
            placeholder="Unique Tag Name Here"
            onChange={(e) => setTagName(e.target.value)}
            ref={register({
              required: true,
              maxLength: {
                value: 20,
                message: "Max 20 Characters",
              },
              pattern: {
                value: /^[\S]+$/,
                message: "Spaces Not Allowed !",
              },
            })}
          />
          <p
            style={{ marginTop: "5px", marginBottom: "0px", color: "#e63535" }}
          >
            {errors.tagname && errors.tagname.message}
          </p>
          <a
            href="./"
            className="badge badge-primary p-2 mt-2 mx-auto"
            style={{
              backgroundColor: "#54D249",
              color: "#292e29",
              fontWeight: "bold",
            }}
          >
            Or just click here. We'll generate a cool unique tag name
          </a>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label
            style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
          >
            Access Permissions
          </Form.Label>
          <Form.Control
            style={{
              backgroundColor: "#363636",
              border: "none",
              color: "white",
              outline: "none",
              fontWeight: "bold",
            }}
            as="select"
            onChange={(e) => setAccess(e.target.value)}
          >
            <option value="1">Allow anyone with tag name</option>
            <option value="2">Allow when user requests</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formGroupDesc">
          <Form.Label
            style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
          >
            Description
          </Form.Label>
          <Form.Control
            style={{
              backgroundColor: "#363636",
              border: "none",
              color: "white",
              outline: "none",
              fontWeight: "bold",
            }}
            type="text"
            placeholder="Enter a small description about this tag"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button
          id="cusbtn"
          variant="primary"
          type="submit"
          style={{ color: "#121212", fontWeight: "bold" }}
        >
          Create
        </Button>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
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
            <b>Tag Created!</b>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{ backgroundColor: "#363535", color: "white", border: "none" }}
        >
          Share your tag name: <b style={{ fontSize: "20px" }}>{tagname}</b>
          <br />
          with your users so that they can start sharing.
          <br />
          Happy Collab!
        </Modal.Body>

        <Modal.Footer
          style={{ backgroundColor: "#363535", color: "white", border: "none" }}
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
        show={error}
        onHide={handleError}
        size="md"
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
            <b>This tag already exists!</b>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{ backgroundColor: "#363535", color: "white", border: "none" }}
        >
          Tag Name entered: <b style={{ fontSize: "20px" }}>{tagname}</b>
          <br />
          already exists. Please use another tag name.
        </Modal.Body>

        <Modal.Footer
          style={{ backgroundColor: "#363535", color: "white", border: "none" }}
        >
          <Button
            id="cusbtn"
            variant="secondary"
            onClick={handleError}
            style={{ color: "#121212", fontWeight: "bold" }}
          >
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Create;
