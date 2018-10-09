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
  faClock, //youtube video duration
  faBriefcase, //my post
  faUser, //profile image replacer
  faGlobe, //in posts
  faUserFriends, //friends or my networks
  faPowerOff, //logout
  faHandHoldingHeart, //borrow (work both for in and out post)
  faHistory,
  faCheck, //approve : when request is being approve, could also use for isActivePost.
  faQuestion //request: making a request from inPost
} from "@fortawesome/free-solid-svg-icons";

import { PublicApp } from "./appPublic";
import { AppHeader } from "./header/appHeader";
import "./app.css";
import "./reactTab.css";
import "../css/boxShadow.css";
import "../component/postItem.css";
import { PrivateApp } from "./appPrivate";
import { API } from "../api/profile-api";
import { BackdoorLogin } from "./backdoorLogin";
import { AppTabEnum } from "./appTabEnum";

library.add(
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faUndoAlt,
  faPlay,
  faPause,
  faClock,
  faBriefcase,
  faUser,
  faGlobe,
  faUserFriends,
  faPowerOff,
  faHandHoldingHeart,
  faHistory,
  faCheck,
  faQuestion
);

class App extends Component {
  state = {
    loginUser: undefined,
    logingOut: false,
    selectTab: AppTabEnum.INPOST,
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
    this.setState({ selectTab: AppTabEnum.INPOST });
  };

  onOutPostNav = () => {
    this.setState({ selectTab: AppTabEnum.OUTPOST });
  };

  onConnectionNav = () => {
    this.setState({ selectTab: AppTabEnum.CONNECTION });
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
      selectTab,
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
          selectTab={selectTab}
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
          selectTab={selectTab}
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

export { App };
