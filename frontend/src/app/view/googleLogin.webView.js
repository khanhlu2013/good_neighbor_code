import React from "react";

function GoogleLoginWebView(onGoogleLogin) {
  return (
    <button onClick={onGoogleLogin} className="btn btn-success">
      Google login
    </button>
  );
}

export default GoogleLoginWebView;
