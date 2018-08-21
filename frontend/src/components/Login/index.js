import React from "react";
import keys from "../../configs/keys";
import DummyLoginForTestPurpose from "./DummyLoginForTestPurpose.react";

function Login(props) {
  return (
    <div>
      <a href={keys.API_URL("auth.google")}>Login with Google</a>
      <DummyLoginForTestPurpose />
    </div>
  );
}

export { Login };
