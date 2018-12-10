import React from "react";

import AuthCheckController from "../controller/authCheck.controller";
import authCheckMobileView from "../view/authCheck.mobileView";

export default function AuthCheckScreen(props) {
  return <AuthCheckController view={authCheckMobileView} />;
}
