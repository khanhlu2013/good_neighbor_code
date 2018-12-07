import React from "react";

function GoogleLoginView(onGoogleLogin) {
  return (
    <button onClick={onGoogleLogin} className="btn btn-success">
      Google login
    </button>
  );
}

export default GoogleLoginView;
