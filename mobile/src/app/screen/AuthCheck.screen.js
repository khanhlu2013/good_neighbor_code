import React from "react";

import authCheckView from "../view/authCheck.view";
import AuthCheckController from "../controller/authCheck.controller";

export default function AuthCheckScreen(props) {
  return (
    <AuthCheckController view={authCheckView} navigation={props.navigation} />
  );
}
