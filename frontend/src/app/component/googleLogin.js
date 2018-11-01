import React from "react";
import API_URL from "../../api/api-url";

function GoogleLogin(props) {
  const onLoginClicked = e => {
    window.location.href = API_URL("auth.google");
  };

  return (
    <button onClick={onLoginClicked} className="btn btn-success">
      Google login
    </button>
  );
}

export default GoogleLogin;
