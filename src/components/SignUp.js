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
    <div
      className="mx-auto"
      style={{
        maxWidth: "700px",
        display: "block",
        alignContent: "center",
        justifyContent: "center",
        verticalAlign: "middle",
        padding: "20px",
        marginTop: "5vh",
      }}
    >
      <center>
        <h2
          className="head-login mb-5"
          style={{ fontWeight: "bold", color: "#5dea51" }}
        >
          Sign Up
        </h2>
      </center>
      <div
        className="login mx-auto"
        style={{
          border: "2px solid #363636",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
            >
              Email address
            </Form.Label>
            <Form.Control
              style={{
                backgroundColor: "#363636",
                border: "none",
                color: "white",
                outline: "none",
                fontWeight: "bold",
              }}
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label
              style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
            >
              Password
            </Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              style={{
                backgroundColor: "#363636",
                border: "none",
                color: "white",
                outline: "none",
                fontWeight: "bold",
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label
              style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
            >
              Name
            </Form.Label>
            <Form.Control
              style={{
                backgroundColor: "#363636",
                border: "none",
                color: "white",
                outline: "none",
                fontWeight: "bold",
              }}
              name="name"
              type="text"
              placeholder="Full Name"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
