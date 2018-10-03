import React, { Component } from "react";

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

    let content;
    if (loginUser === undefined) {
      content = null;
    } else if (loginUser === null) {
      content = <PublicApp />;
      // content = <h1 className="text-center">App Public</h1>;
    } else {
      content = <PrivateApp loginUser={loginUser} />;
    }

    return (
      <div>
        <AppHeader
          loginUser={loginUser}
          onLoginUserChange={this.onLoginUserChange}
        />
        <div>{content}</div>
      </div>
    );
  }
}

export default App;
