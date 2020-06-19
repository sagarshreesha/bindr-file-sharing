import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import Upload from "./Upload";
import Manage from "./Manage";
import { Route } from "react-router-dom";
import Create from "./Create";

const Home = () => {
  return (
    <div>
      <Header />
      <main role="main" className="container">
        {/*<ul class="hs full no-scrollbar font-weight-bold">
              <p
                class="recent mb-2"
                style={{ fontWeight: "bold", fontSize: "18px" }}
              >
                Recently Used
              </p>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
              <li class="item">test</li>
  </ul>*/}

        <Route exact path="/" component={Menu} />

        <Route exact path="/upload" component={Upload} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/manage" component={Manage} />
      </main>{" "}
    </div>
  );
};

export default Home;
