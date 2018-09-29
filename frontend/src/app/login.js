import React from "react";
import { API_URL } from "../api/api-url";

function Login(props) {
  return (
    <div className="text-center">
      <a href={API_URL("auth.google")}>Login/SignUp with Google</a>
    </div>
  );
}

export { Login };
