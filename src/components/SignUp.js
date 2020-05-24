import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Form, Button } from "react-bootstrap";
import app from "../base";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, name } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        const db = app.firestore();
        db.collection("users").add({
          name: name.value,
          photoURL: "",
          uid: app.auth().currentUser.uid,
        });
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <Form onSubmit={handleSignUp}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Full Name" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(SignUp);
