import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base.js";
import { AuthContext } from "../Auth.js";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

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
          Login
        </h2>
      </center>
      <div
        className="login mx-auto"
        style={{
          border: "2px solid #363636",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "5vh",
        }}
      >
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{ color: "#929493", fontWeight: "bold", fontSize: "18px" }}
            >
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              style={{
                backgroundColor: "#363636",
                border: "none",
                color: "white",
                outline: "none",
                fontWeight: "bold",
              }}
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
              placeholder="Enter your password"
              style={{
                backgroundColor: "#363636",
                border: "none",
                color: "white",
                outline: "none",
                fontWeight: "bold",
              }}
            />
          </Form.Group>

          <center>
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              style={{
                backgroundColor: "#5dea51",
                padding: "8px 20px 8px 20px",
                fontWeight: "bold",
                color: "black",
                border: "none",
                fontSize: "17px",
              }}
            >
              Login
            </Button>
          </center>
        </Form>
      </div>
      <center>
        <Link to="./signup">
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            style={{
              backgroundColor: "#121212",
              padding: "8px 20px 8px 20px",
              fontWeight: "bold",
              color: "#5dea51",
              border: "none",
              fontSize: "17px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Sign Up Here
          </Button>
        </Link>
      </center>
    </div>
  );
};

export default withRouter(Login);
