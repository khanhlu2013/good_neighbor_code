import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { User } from "../model/user";
import { GoogleLogin } from "../app/googleLogin";
import { nullOrRequiredValidator } from "../util";
import AppTabEnum from "../component/appTabEnum";
import { LoadingIcon } from "../componentUi/loadingIcon";
import { AppCenterWrapMixin } from "../componentUi/style/appCenterWrap_style";
import { BannerMixin } from "../componentUi/style/banner_mixin";
import AppHeaderTabBar from "../component/appHeader_tabBar";
import { calculateConnectionNotification } from "../reducer/connection_reducer";
import { filterInPostApproveAlert } from "../reducer/inPost_reducer";
import { calculateOutPostNotification } from "../reducer/outPost_reducer";
import { changeAppTab } from "../action/selectAppTab_action";

const Banner = styled.div`
  ${BannerMixin} background-color: rgb(36, 54, 65);
`;
const CenterWrap = styled.div`
  ${AppCenterWrapMixin} height: 100%;
  display: flex;
`;

const AppIconWrap = styled.div`
  align-self: center;
  flex-grow: 1;

  color: white;
  font-weight: lighter;
  font-size: 1.3em;
  user-select: none;
`;
const AuthCheckWrap = styled.div`
  color: white;
  align-self: center;
`;
const GoogleLoginWrap = styled.div`
  align-self: center;
`;

function AppHeaderComponent(props) {
  const {
    loginUser,
    isCheckingAuth,
    onAppTabChange,
    selectAppTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  let content;

  if (isCheckingAuth) {
    content = (
      <AuthCheckWrap>
        <LoadingIcon text="loading" />
      </AuthCheckWrap>
    );
  } else if (loginUser === undefined) {
    content = null;
  } else if (loginUser === null) {
    content = (
      <GoogleLoginWrap>
        <GoogleLogin />
      </GoogleLoginWrap>
    );
  } else {
    content = (
      <AppHeaderTabBar
        onAppTabChange={onAppTabChange}
        selectAppTab={selectAppTab}
        inPostNoteCount={inPostNoteCount}
        outPostNoteCount={outPostNoteCount}
        connectionNoteCount={connectionNoteCount}
      />
    );
  }

  return (
    <Banner>
      <CenterWrap>
        <AppIconWrap>Good Neighbor</AppIconWrap>
        {content}
      </CenterWrap>
    </Banner>
  );
}

AppHeaderComponent.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  isCheckingAuth: PropTypes.bool.isRequired,
  onAppTabChange: PropTypes.func.isRequired,
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

const mapStateToProps = (state, ownProps) => {
  const { loginUser, isCheckingAuth } = state.auth;
  const loginUserId = loginUser && loginUser.id;
  return {
    loginUser,
    isCheckingAuth,
    selectAppTab: state.selectAppTab,
    inPostNoteCount: filterInPostApproveAlert(state.inPost.posts, loginUserId)
      .length,
    outPostNoteCount: calculateOutPostNotification(
      state.outPost.posts,
      loginUserId
    ),
    connectionNoteCount: calculateConnectionNotification(
      state.connection.connections
    )
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onAppTabChange: appTab => dispatch(changeAppTab(appTab))
});
const AppHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeaderComponent);

export default AppHeaderContainer;
