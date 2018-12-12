import React from "react";
import GoogleLoginViewPropTypes from "@gn/common/app/propTypes/googleLoginView.propTypes";

function GoogleLoginWebView(props) {
  const { onGoogleLogin } = props;
  return (
    <button onClick={onGoogleLogin} className="btn btn-success">
      Google login
    </button>
  );
}
GoogleLoginWebView.propTypes = GoogleLoginViewPropTypes;

export default GoogleLoginWebView;
