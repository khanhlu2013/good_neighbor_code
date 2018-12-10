import React from "react";
import styled from "styled-components";
import AppCenterWrapStyle from "../../share/style/appCenterWrap_style";
import BackDoorLoginWebView from "./backdoorLogin.webView";
import PrivateAppConnect from "../connect/appPrivate.connect";
import AppHeaderConnect from "../connect/appHeader.connect";
import LoadingIcon from "../../share/loadingIcon";
import PublicAppWebView from "./publicApp/publicApp.webView";
import BackdoorLoginController from "@gn/common/app/controller/backdoorLogin.controller";

const AuthCheckStyle = styled.div`
  text-align: center;
`;

export default function AppWebView(loginUser, isCheckingAuth, isCheckedAuth) {
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
        <PublicAppWebView />
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
          <BackdoorLoginController view={BackDoorLoginWebView} />
        </AppCenterWrapStyle>
      )}
      {appContent}
    </div>
  );
}
