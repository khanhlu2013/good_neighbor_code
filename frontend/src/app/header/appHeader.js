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

const Background = styled.div`
  height: 57px;
  background-color: rgb(36, 54, 65);
  min-width: 420px;
  color: white;
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
  align-self: center;
`;
const GoogleLoginWrap = styled.div`
  align-self: center;
`;

function AppHeader(props) {
  const {
    loginUser,
    onAppTabChange,
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  let content;

  if (loginUser === undefined) {
    content = (
      <AuthCheckWrap>
        <LoadingIcon text="loading" />
      </AuthCheckWrap>
    );
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
    <Background>
      <CenterWrap>
        <AppIconWrap>Good Neighbor</AppIconWrap>
        {content}
      </CenterWrap>
    </Background>
  );
}

AppHeader.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  onUserDidLogOut: PropTypes.func.isRequired,
  onAppTabChange: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
