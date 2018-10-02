import React, { Component, Fragment } from "react";

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
  faPlay, //play youtube video
  faPause, //pause youtube video
  faClock //youtube video duration
} from "@fortawesome/free-solid-svg-icons";
import { PublicApp } from "./appPublic";
import { Login } from "./login";
import { LoadingIcon } from "../util";

import BackdoorLogin from "./backdoorLogin";
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

  onLogoutClicked = e => {
    this.setState({ logingOut: true });
    (async () => {
      await API.logout();
      this.setState({ logingOut: false, loginUser: null });
    })();
  };

  render() {
    const { loginUser } = this.state;
    let header;
    if (loginUser === undefined) {
      header = (
        <h4>
          <LoadingIcon text="loading" />
        </h4>
      );
    } else if (loginUser === null) {
      header = (
        <Fragment>
          <Login />
          <BackdoorLogin onLoginUserChange={this.onLoginUserChange} />
        </Fragment>
      );
    } else {
      header = (
        <div>
          {loginUser.getNameAndEmail()}
          <span className="mx-1">
            {this.state.logingOut ? (
              <LoadingIcon text="logout" />
            ) : (
              <button
                onClick={this.onLogoutClicked}
                className="btn btn-sm btn-warning"
              >
                logout
              </button>
            )}
          </span>
        </div>
      );
    }

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
        <div className="app-header">
          <div className="app h2 font-weight-light">Good Neighbor</div>
          {header}
        </div>
        <div>{content}</div>
      </div>
    );
  }
}

export default App;
