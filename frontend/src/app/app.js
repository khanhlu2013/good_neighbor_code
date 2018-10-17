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

import "../util/css/tabPanel.css";
import "../util/css/myBootstrap.css";
import "../css/tabBar.css";
import "../css/banner.css";
import "../css/appComponent_tabItem_customize.css";
import "../css/app.css";
import "../css/reactModal.css";
import "../component/post/postItem.css";

import { PublicApp } from "./appPublic";
import { AppHeader } from "./header/appHeader";
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
      if (process.env.NODE_ENV === "production") {
        appContent = <PublicApp />;
      } else {
        appContent = (
          <h1 id="appPublic-react" className="text-center app-container">
            App Public
          </h1>
        );
      }

      appContent = <PublicApp />;
      // appContent = <h1 id="appPublic-react" className="text-center app-container">App Public</h1>;
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
        <div className="app-container">
          {loginUser === null && (
            <BackdoorLogin onUserDidLogIn={this.onUserDidLogIn} />
          )}
        </div>
        {appContent}
      </div>
    );
  }
}

export { App };
