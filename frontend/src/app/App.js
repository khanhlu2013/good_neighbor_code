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
  faCheck, //is active
  faLocationArrow, //return
  faRecycle, //borrowed
  faUserClock, //borrowing
  faPlay, //play youtube video
  faPause, //pause youtube video
  faClock //youtube video duration
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../api/api-url";
import { PublicApp } from "./appPublic";
import { Login } from "./login";
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
    loginUser: null
  };

  componentDidMount() {
    (async () => {
      const user = await API.profile();
      if (user) {
        this.setState({ loginUser: user });
      }
    })();
  }

  render() {
    const { loginUser } = this.state;
    return (
      <div>
        <div className="App-header">
          <h1>Welcome to Good Neighbor</h1>
          {loginUser ? (
            <h4>
              {loginUser.name} - {loginUser.email} -
              <a href={API_URL("profile.logout")}> logout</a>
            </h4>
          ) : (
            <Login />
          )}
        </div>
        <div className="App-body">
          {loginUser ? <PrivateApp loginUser={loginUser} /> : <PublicApp />}
        </div>
      </div>
    );
  }
}

export default App;
