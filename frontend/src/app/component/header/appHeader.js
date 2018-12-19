import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import User from "@gn/common/model/user";
import AppTabEnum from "@gn/common/app/appTabEnum";
import { AppCenterWrapMixin } from "../../../share/style/appCenterWrap_style";
import AppHeaderTabBar from "./appHeader_tabBar";
import GoogleLoginWebView from "../../view/googleLogin.webView";
import BannerMixin from "../../../share/mixin/banner.webMixin";
import API_URL from "@gn/common/api/api-url";
import GoogleLoginController from "@gn/common/app/controller/googleLogin.controller";

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
const GoogleLoginWrap = styled.div`
  align-self: center;
`;
function onGoogleLoginWeb() {
  window.location.href = API_URL("auth.google");
}

function AppHeaderComponent(props) {
  const {
    loginUser,
    isCheckedAuth,
    onAppTabChange,
    selectAppTab,
    inPostAlertCount,
    outPostAlertCount,
    connectionAlertCount
  } = props;

  let content;

  if (isCheckedAuth === false) {
    content = null;
  } else if (loginUser === null) {
    content = (
      <GoogleLoginWrap>
        <GoogleLoginController
          onGoogleLogin={onGoogleLoginWeb}
          view={GoogleLoginWebView}
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
  isCheckedAuth: PropTypes.bool.isRequired,
  onAppTabChange: PropTypes.func.isRequired,
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostAlertCount: PropTypes.number.isRequired,
  outPostAlertCount: PropTypes.number.isRequired,
  connectionAlertCount: PropTypes.number.isRequired
};

export default AppHeaderComponent;
