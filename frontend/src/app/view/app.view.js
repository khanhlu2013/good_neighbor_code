import React from "react";
import styled from "styled-components";
import AppCenterWrapStyle from "../../share/style/appCenterWrap_style";
import BackDoorLoginView from "./backdoorLogin.view";
import PrivateAppConnect from "../connect/appPrivate.connect";
import AppHeaderConnect from "../connect/appHeader.connect";
import PublicAppView from "./publicApp/publicApp.view";
import LoadingIcon from "../../share/loadingIcon";
import BackdoorLoginConnect from "@gn/common/app/connect/backdoorLogin.connect";

const AuthCheckStyle = styled.div`
  text-align: center;
`;

export default function AppView(loginUser, isCheckingAuth, isCheckedAuth) {
  let appContent;
  if (isCheckingAuth) {
    appContent = (
      <AuthCheckStyle>
        <h1>
          <LoadingIcon text="authenticating ..." />
        </h1>
      </AuthCheckStyle>
    );
  } else if (loginUser === null) {
    appContent = (
      <AppCenterWrapStyle>
        <PublicAppView />
      </AppCenterWrapStyle>
    );
  } else {
    appContent = <PrivateAppConnect />;
  }

  return (
    <div id="app-react">
      <AppHeaderConnect />
      {loginUser === null && isCheckedAuth && (
        <AppCenterWrapStyle>
          <BackdoorLoginConnect view={BackDoorLoginView} />
        </AppCenterWrapStyle>
      )}
      {appContent}
    </div>
  );
}
