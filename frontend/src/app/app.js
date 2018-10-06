import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faThumbsUp, //approve
  faThumbsDown, //deny
  faTrashAlt, //remove
  faUndoAlt,
  faPlay, //play youtube video
  faPause, //pause youtube video
  faClock //youtube video duration
} from "@fortawesome/free-solid-svg-icons";

import { PublicApp } from "./appPublic";
import { AppHeader } from "./header/appHeader";
import "./app.css";
import "./reactTab.css";
import { PrivateApp } from "./appPrivate";
import { API } from "../api/profile-api";
import { BackdoorLogin } from "./backdoorLogin";
library.add(
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faUndoAlt,
  faPlay,
  faPause,
  faClock
);
class App extends Component {
  state = {
    loginUser: undefined,
    logingOut: false
  };

  onLogOut = () => {
    this.onLoginUserChange(null);
  };
  onLoginUserChange = loginUser => {
    this.setState({ loginUser });
  };

  onInPostNav = () => {
    console.log("in post nav");
  };

  onOutPostNav = () => {
    console.log("out post nav");
  };

  onConnectionNav = () => {
    console.log("connection nav");
  };

  async componentDidMount() {
    this.setState({ loginUser: await API.authCheck() });
  }

  render() {
    const { loginUser } = this.state;

    let appContent;
    if (loginUser === undefined) {
      appContent = null;
    } else if (loginUser === null) {
      appContent = <PublicApp />;
      // appContent = <h1 className="text-center">App Public</h1>;
    } else {
      appContent = <PrivateApp loginUser={loginUser} />;
    }

    return (
      <Fragment>
        <AppHeader
          loginUser={loginUser}
          onLogOut={this.onLogOut}
          onInPostNav={this.onInPostNav}
          onOutPostNav={this.onOutPostNav}
          onConnectionNav={this.onConnectionNav}
        />
        <div className="app-container">
          {loginUser === null && (
            <BackdoorLogin onLoginUserChange={this.onLoginUserChange} />
          )}
          {appContent}
        </div>
      </Fragment>
    );
  }
}

export default App;
