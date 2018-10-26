import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

import { PublicApp } from "../app/appPublic";
import { AppHeader } from "../app/header/appHeader";
import { PrivateApp } from "../app/appPrivate";
import { AppTabEnum } from "../app/appTabEnum";
import { AppCenterWrapStyle } from "../componentUi/style/appCenterWrap_style";
import { User } from "../model/user";
import { checkAuth } from "../action/auth_action";
import BackdoorLoginContainer from "./backdoorLogin";

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

class AppComponent extends Component {
  static propTypes = {
    loginUser: PropTypes.instanceOf(User),
    isCheckingAuth: PropTypes.bool.isRequired
  };

  state = {
    logingOut: false,
    selectTab: AppTabEnum.INPOST,
    inPostNoteCount: null,
    outPostNoteCount: null,
    connectionNoteCount: null
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
    const { dispatch } = this.props;
    dispatch(checkAuth());
  }

  render() {
    const { loginUser, isCheckingAuth } = this.props;
    const {
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
          isCheckingAuth={isCheckingAuth}
          onAppTabChange={this.onAppTabChange}
          selectTab={selectTab}
          inPostNoteCount={inPostNoteCount}
          outPostNoteCount={outPostNoteCount}
          connectionNoteCount={connectionNoteCount}
        />
        {loginUser === null && (
          <AppCenterWrapStyle>
            <BackdoorLoginContainer />
          </AppCenterWrapStyle>
        )}
        {appContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const loginUser = state.loginUser.value;
  const { isCheckingAuth } = state;

  return {
    loginUser,
    isCheckingAuth
  };
};

const AppContainer = connect(mapStateToProps)(AppComponent);
export default AppContainer;
