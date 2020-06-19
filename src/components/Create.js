import React from "react";
import app from "../base";
import { Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";

const Create = () => {
  React.useEffect(() => {
    setUsers(app.auth().currentUser.uid);
  }, []);

  const [tagname, setTagName] = React.useState(null);
  const [filename] = React.useState([]);
  const [access, setAccess] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [downloadURLs] = React.useState([]);
  const [date] = React.useState(new Date());
  const [description, setDescription] = React.useState();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onCreate = (e) => {
    e.preventDefault();
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
    });
    handleShow();
  };

  return (
    <div id="formid" className="w-50 mx-auto">
      <PrivateRoute path="/create" component={Home} />
      <PrivateRoute exact path="/upload" component={Home} />
      <PrivateRoute exact path="/manage" component={Home} />
      <Form className="font-weight-bold" onSubmit={onCreate}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Tag Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unique Tag Name Here"
            onChange={(e) => setTagName(e.target.value)}
          />
          <a
            href="./"
            class="badge badge-primary p-2 mt-2 mx-auto"
            style={{ backgroundColor: "#54D249" }}
          >
            Or just click here. We'll generate a cool unique tag name
          </a>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Access Permissions</Form.Label>
          <Form.Control as="select" onChange={(e) => setAccess(e.target.value)}>
            <option value="1">Allow anyone with tag name</option>
            <option value="2">Allow when user requests</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formGroupDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a small description about this tag"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button id="cusbtn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <b>Tag Created!</b>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Share your tag name: <b style={{ fontSize: "20px" }}>{tagname}</b>
          <br />
          with your users so that they can start sharing.
          <br />
          Happy Collab!
        </Modal.Body>

        <Modal.Footer>
          <Link to="./">
            <Button id="cusbtn" variant="secondary" onClick={handleClose}>
              Go Home
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Create;
