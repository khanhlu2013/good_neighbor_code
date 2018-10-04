import React, { Component, Fragment } from "react";

import "./app.css";
import "./reactTab.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { PrivateApp } from "./appPrivate";
import { API } from "../api/profile-api";

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
import { AppHeader } from "./appHeader";
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

  onLoginUserChange = loginUser => {
    this.setState({ loginUser });
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
          onLoginUserChange={this.onLoginUserChange}
        />
        <div className="app-container">{appContent}</div>
      </Fragment>
    );
  }
}

export default App;
