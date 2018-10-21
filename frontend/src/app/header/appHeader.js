import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeader_tabBar";
import { AppTabEnum } from "../appTabEnum";
import { LoadingIcon } from "../../componentUi/loadingIcon";

function AppHeader(props) {
  const {
    loginUser,
    onAppTabChange,
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  const Background = styled.div`
    height: 57px;
    background-color: rgb(36, 54, 65);
    min-width: 420px;
  `;
  const CenterWrap = styled.div`
    height: 100%;
    max-width: 700px;
    min-width: 420px;
    margin: 0 auto;
    padding: 0 10px;
  `;
  const HorizontalLayout = styled.div`
    height: 100%;
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
        <HorizontalLayout>
          <AppIconWrap>Good Neighbor</AppIconWrap>
          {content}
        </HorizontalLayout>
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
