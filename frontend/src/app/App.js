import React, { Component } from "react";

import "./app.css";
import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { PrivateApp } from "./appPrivate";
import { API } from "../api/profile-api";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faThumbsUp, //approve
  faThumbsDown, //deny
  faTrashAlt, //remove
  faUndoAlt,
  faShareAlt, //decision
  faPencilAlt, //edit
  faQuestion, //request
  faCheck, //is active, accept approval and borrow
  faLocationArrow, //return
  faRecycle, //return
  faUserClock, //borrow
  faPlay, //play youtube video
  faPause, //pause youtube video
  faClock //youtube video duration
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../api/api-url";
import { PublicApp } from "./appPublic";
import { Login } from "./login";
import { LoadingIcon } from "../util";
library.add(
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faUndoAlt,
  faShareAlt,
  faPencilAlt,
  faQuestion,
  faCheck,
  faLocationArrow,
  faRecycle,
  faUserClock,
  faPlay,
  faPause,
  faClock
);

class App extends Component {
  state = {
    loginUser: undefined
  };

  async componentDidMount() {
    this.setState({ loginUser: await API.profile() });
  }

  render() {
    const { loginUser } = this.state;
    let header;
    if (loginUser === undefined) {
      header = (
        <h4>
          <LoadingIcon text="loading" isAnimate={true} />
        </h4>
      );
    } else if (loginUser === null) {
      header = <Login />;
    } else {
      header = (
        <div>
          {loginUser.name} - {loginUser.email} -
          <a href={API_URL("profile.logout")}> logout</a>
        </div>
      );
    }

    let content;
    if (loginUser === undefined) {
      content = null;
    } else if (loginUser === null) {
      content = <PublicApp />;
    } else {
      content = <PrivateApp loginUser={loginUser} />;
    }

    return (
      <div>
        <div className="App-header">
          <h1>Good Neighbor</h1>
          {header}
        </div>
        <div className="App-body">{content}</div>
      </div>
    );
  }
}

export default App;
