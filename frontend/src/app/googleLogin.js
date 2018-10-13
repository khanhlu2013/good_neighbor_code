import React, { Fragment } from "react";
import { API_URL } from "../api/api-url";

function GoogleLogin(props) {
  const onLoginClicked = e => {
    window.location.href = API_URL("auth.google");
  };

  return (
    <div className="appHeader-googleLogIn">
      <button onClick={onLoginClicked} className="btn btn-success">
        Google login
      </button>
    </div>
  );
}

export { GoogleLogin };
