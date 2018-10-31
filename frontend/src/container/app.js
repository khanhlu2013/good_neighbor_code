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
import PrivateAppContainer from "./appPrivate";
import { AppCenterWrapStyle } from "../componentUi/style/appCenterWrap_style";
import { User } from "../model/user";
import { checkAuth } from "../action/auth_action";
import BackdoorLoginContainer from "./backdoorLogin";
import AppHeaderContainer from "./appHeader";

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
    loginUser: PropTypes.instanceOf(User)
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(checkAuth());
  }

  render() {
    const { loginUser } = this.props;

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
      appContent = <PrivateAppContainer />;
    }
    return (
      <div id="app-react">
        <AppHeaderContainer />
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
  const { loginUser } = state.auth;

  return {
    loginUser
  };
};

const AppContainer = connect(mapStateToProps)(AppComponent);
export default AppContainer;
