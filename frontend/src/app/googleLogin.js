import React, { Fragment } from "react";
import { API_URL } from "../api/api-url";

function GoogleLogin(props) {
  const onLoginClicked = e => {
    window.location.href = API_URL("auth.google");
  };

  return (
    <Fragment>
      <button onClick={onLoginClicked} className="btn btn-sm btn-success">
        Google login
      </button>
    </Fragment>
  );
}

export { GoogleLogin };
