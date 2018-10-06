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
import "../component/postItem.css";
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
    logingOut: false,
    isInOutCon1BaseIndexTabVisible: 1,
    inPostNoteCount: null,
    outPostNoteCount: null,
    connectionNoteCount: null
  };

  onLogOut = () => {
    this.onLoginUserChange(null);
  };
  onLoginUserChange = loginUser => {
    this.setState({ loginUser });
  };

  onInPostNav = () => {
    this.setState({ isInOutCon1BaseIndexTabVisible: 1 });
  };

  onOutPostNav = () => {
    this.setState({ isInOutCon1BaseIndexTabVisible: 2 });
  };

  onConnectionNav = () => {
    this.setState({ isInOutCon1BaseIndexTabVisible: 3 });
  };

  onInPostNotify = count => {
    this.setState({ inPostNoteCount: count });
  };
  onOutPostNotify = count => {
    this.setState({ outPostNoteCount: count });
  };
  onConnectionNotify = count => {
    this.setState({ connectionNoteCount: count });
  };

  async componentDidMount() {
    this.setState({ loginUser: await API.authCheck() });
  }

  render() {
    const {
      loginUser,
      isInOutCon1BaseIndexTabVisible,
      inPostNoteCount,
      outPostNoteCount,
      connectionNoteCount
    } = this.state;

    let appContent;
    if (loginUser === undefined) {
      appContent = null;
    } else if (loginUser === null) {
      appContent = <PublicApp />;
      // appContent = <h1 className="text-center">App Public</h1>;
    } else {
      appContent = (
        <PrivateApp
          loginUser={loginUser}
          isInOutCon1BaseIndexTabVisible={isInOutCon1BaseIndexTabVisible}
          onConnectionNotify={this.onConnectionNotify}
          onInPostNotify={this.onInPostNotify}
          onOutPostNotify={this.onOutPostNotify}
        />
      );
    }

    return (
      <Fragment>
        <AppHeader
          loginUser={loginUser}
          onLogOut={this.onLogOut}
          onInPostNav={this.onInPostNav}
          onOutPostNav={this.onOutPostNav}
          onConnectionNav={this.onConnectionNav}
          isInOutCon1BaseIndexTabVisible={
            this.state.isInOutCon1BaseIndexTabVisible
          }
          inPostNoteCount={inPostNoteCount}
          outPostNoteCount={outPostNoteCount}
          connectionNoteCount={connectionNoteCount}
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
