import React from "react";
import DummyLoginForTestPurpose from "./DummyLoginForTestPurpose.react";
import { API_URL } from "../api/api-url";

function Login(props) {
  return (
    <div className="text-center">
      <a href={API_URL("auth.google")}>Login/SignUp with Google</a>
      {/* {process.env.NODE_ENV !== "production" && <DummyLoginForTestPurpose />} */}
    </div>
  );
}

export { Login };
