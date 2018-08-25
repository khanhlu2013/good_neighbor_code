import React from "react";
import DummyLoginForTestPurpose from "./DummyLoginForTestPurpose.react";
import { API_URL } from "../../api/api-url";

function Login(props) {
  return (
    <div>
      <a href={API_URL("auth.google")}>Login with Google</a>
      <DummyLoginForTestPurpose />
    </div>
  );
}

export { Login };
