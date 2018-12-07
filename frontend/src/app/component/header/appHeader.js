import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import User from "../../../model/user";
import AppTabEnum from "../appTabEnum";
import LoadingIcon from "../../../share/loadingIcon";
import { AppCenterWrapMixin } from "../../../share/style/appCenterWrap_style";
import BannerMixin from "../../../share/style/banner_mixin";
import AppHeaderTabBar from "./appHeader_tabBar";
import API_URL from "../../../api/api-url";
import GoogleLoginController from "../../controller/googleLogin.controller";
import GoogleLoginView from "../../view/googleLogin.view";

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
function onGoogleLogin() {
  window.location.href = API_URL("auth.google");
}

function AppHeaderComponent(props) {
  const {
    loginUser,
    isCheckingAuth,
    onAppTabChange,
    selectAppTab,
    inPostAlertCount,
    outPostAlertCount,
    connectionAlertCount
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
        <GoogleLoginController
          onGoogleLogin={onGoogleLogin}
          view={GoogleLoginView}
        />
      </GoogleLoginWrap>
    );
  } else {
    content = (
      <AppHeaderTabBar
        onAppTabChange={onAppTabChange}
        selectAppTab={selectAppTab}
        inPostAlertCount={inPostAlertCount}
        outPostAlertCount={outPostAlertCount}
        connectionAlertCount={connectionAlertCount}
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
  inPostAlertCount: PropTypes.number.isRequired,
  outPostAlertCount: PropTypes.number.isRequired,
  connectionAlertCount: PropTypes.number.isRequired
};

export default AppHeaderComponent;
