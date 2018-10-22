import React, { Component } from "react";
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
  faUserCog, //profile image replacer
  faGlobe, //in posts
  faUserFriends, //friends or my networks
  faHandHoldingHeart, //borrow (work both for in and out post)
  faHistory,
  faCheck, //approve : when request is being approve, could also use for isActivePost.
  faQuestion, //request: making a request from inPost
  faRetweet,
  faSignOutAlt, //connection - my request
  faSignInAlt, //connection - friend request
  faSearch,
  faUserSlash //deny user list
} from "@fortawesome/free-solid-svg-icons";

import "../css/myBootstrap.css";
import "../css/reactModal.css";

import { PublicApp } from "./appPublic";
import { AppHeader } from "./header/appHeader";
import { PrivateApp } from "./appPrivate";
import { API } from "../api/profile-api";
import { BackdoorLogin } from "./backdoorLogin";
import { AppTabEnum } from "./appTabEnum";
import { AppCenterWrapStyle } from "../componentUi/style/appCenterWrap_style";

library.add(
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faUndoAlt,
  faPlay,
  faPause,
  faClock,
  faBriefcase,
  faUserCog,
  faGlobe,
  faUserFriends,
  faHandHoldingHeart,
  faHistory,
  faCheck,
  faQuestion,
  faRetweet,
  faSignOutAlt,
  faSignInAlt,
  faSearch,
  faUserSlash
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

  onUserDidLogOut = () => {
    this.setState({ loginUser: null });
  };

  onUserDidLogIn = loginUser => {
    this.setState({ loginUser });
  };

  onAppTabChange = selectTab => {
    this.setState({ selectTab });
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
      appContent = (
        <AppCenterWrapStyle>
          <PublicApp />
        </AppCenterWrapStyle>
      );
    } else {
      appContent = (
        <PrivateApp
          loginUser={loginUser}
          selectTab={selectTab}
          onConnectionNotify={this.onConnectionNotify}
          onInPostNotify={this.onInPostNotify}
          onOutPostNotify={this.onOutPostNotify}
          onUserDidLogOut={this.onUserDidLogOut}
        />
      );
    }
    return (
      <div id="app-react">
        <AppHeader
          loginUser={loginUser}
          onUserDidLogOut={this.onUserDidLogOut}
          onAppTabChange={this.onAppTabChange}
          selectTab={selectTab}
          inPostNoteCount={inPostNoteCount}
          outPostNoteCount={outPostNoteCount}
          connectionNoteCount={connectionNoteCount}
        />
        {loginUser === null && (
          <AppCenterWrapStyle>
            <BackdoorLogin onUserDidLogIn={this.onUserDidLogIn} />
          </AppCenterWrapStyle>
        )}
        {appContent}
      </div>
    );
  }
}

export { App };
