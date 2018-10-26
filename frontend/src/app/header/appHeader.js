import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeader_tabBar";
import { AppTabEnum } from "../appTabEnum";
import { LoadingIcon } from "../../componentUi/loadingIcon";
import { AppCenterWrapMixin } from "../../componentUi/style/appCenterWrap_style";
import { BannerMixin } from "../../componentUi/style/banner_mixin";

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

function AppHeader(props) {
  const {
    loginUser,
    isCheckingAuth,
    onAppTabChange,
    selectTab,
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
        selectTab={selectTab}
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

AppHeader.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  isCheckingAuth: PropTypes.bool.isRequired,
  onAppTabChange: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
