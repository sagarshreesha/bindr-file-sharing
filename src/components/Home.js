import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import Upload from "./Upload";
import Manage from "./Manage";
import { Route } from "react-router-dom";
import Create from "./Create";
import Clipboard from "./Clipboard";

const Home = () => {
  return (
    <div>
      <Header />
      <main
        id="main"
        role="main"
        className="container"
        style={{ maxWidth: "100%" }}
      >
        <Route exact path="/" component={Menu} />
        <Route exact path="/" component={Clipboard} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/manage" component={Manage} />
      </main>{" "}
    </div>
  );
};

export default Home;
