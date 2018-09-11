import React, { Component } from "react";

import "./App.css";
import { Login } from "./AppPublic";
import { PrivateApp } from "./AppPrivate";
import { API } from "../api/profile-api";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faUndoAlt,
  faShareAlt, //decision
  faPencilAlt, //edit
  faQuestion,
  faCheck,
  faLocationArrow, //return
  faRecycle, //borrowed
  faUserClock
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../api/api-url";
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
  faUserClock
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
      <div className="App">
        <div className="App-header">
          <h1>Welcome to Good Neighboors</h1>
          {loginUser && (
            <h3>
              {loginUser.name} - {loginUser.email} -
              <a href={API_URL("profile.logout")}> logout</a>
            </h3>
          )}
        </div>

        {loginUser ? <PrivateApp loginUser={loginUser} /> : <Login />}
      </div>
    );
  }
}

export default App;
