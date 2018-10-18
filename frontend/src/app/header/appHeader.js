import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeader_tabBar";
import { LoadingIcon } from "../../util/loadingIcon";
import { AppTabEnum } from "../appTabEnum";

function AppHeader(props) {
  const {
    loginUser,
    onAppTabChange,
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  const BannerBackground = styled.div`
    height: 57px;
    background-color: rgb(36, 54, 65);
    color: white;
    min-width: 420px;
    display: flex;
  `;
  const HeaderWrap = styled.div`
    display: flex;
    max-width: 700px;
    min-width: 420px;
    margin: 0 auto;
    padding: 0 10px;
    flex-grow: 1;
  `;
  const AppIconWrap = styled.div`
    align-self: center;
    flex-grow: 1;

    font-weight: lighter;
    font-size: 1.3em;
    user-select: none;
  `;
  const TabBarWrap = styled.div`
    align-self: flex-end;
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
      <TabBarWrap>
        <AppHeaderTabBar
          onAppTabChange={onAppTabChange}
          selectTab={selectTab}
          inPostNoteCount={inPostNoteCount}
          outPostNoteCount={outPostNoteCount}
          connectionNoteCount={connectionNoteCount}
        />
      </TabBarWrap>
    );
  }

  return (
    <BannerBackground>
      <HeaderWrap>
        <AppIconWrap>Good Neighbor</AppIconWrap>

        {content}
      </HeaderWrap>
    </BannerBackground>
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
