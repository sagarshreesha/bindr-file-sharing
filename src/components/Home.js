import React, { useState } from "react";
import app from "../base";
import Header from "./Header";
import Menu from "./Menu";
import Upload from "./Upload";
import PrivateRoute from "../PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Create from "./Create";

const Home = () => {
  return (
    <div>
      <Header />
      <main role="main" className="container">
        <div className="starter-template mt-5">
          <div class="app">
            <ul class="hs full no-scrollbar font-weight-bold">
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
            </ul>
          </div>
          <Route exact path="/" component={Menu} />
        </div>
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/create" component={Create} />
      </main>{" "}
    </div>
  );
};

export default Home;
