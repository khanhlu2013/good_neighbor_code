import React from "react";
import AppCenterWrapStyle from "../../share/style/appCenterWrap_style";
import BackDoorLoginView from "./backdoorLogin.view";
import PrivateAppConnect from "../connect/appPrivate.connect";
import AppHeaderConnect from "../connect/appHeader.connect";
import PublicAppView from "./publicApp/publicApp.view";
import BackdoorLoginConnect from "@gn/common/app/connect/backdoorLogin.connect";

export default function AppView(loginUser, isCheckedAuth) {
  let appContent;
  if (!isCheckedAuth) {
    appContent = null;
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
      {loginUser === null && (
        <AppCenterWrapStyle>
          <BackdoorLoginConnect view={BackDoorLoginView} />
        </AppCenterWrapStyle>
      )}
      {appContent}
    </div>
  );
}
