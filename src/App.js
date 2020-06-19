import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Create from "./components/Create";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute path="/create" component={Home} />
          <PrivateRoute exact path="/upload" component={Home} />
          <PrivateRoute exact path="/manage" component={Home} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
