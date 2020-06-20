import React, { useEffect, useState } from "react";
import app from "./base.js";
import { Spinner } from "react-bootstrap";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div style={{ width: "100%" }}>
        <Spinner
          animation="border"
          variant="success"
          style={{
            position: "absolute",
            height: "50px",
            width: "50px",
            top: "20%",
            left: "50%",
            marginLeft: "-25px",
            marginTop: "-25px",
          }}
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
