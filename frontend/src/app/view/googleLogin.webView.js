import React from "react";
import GoogleLoginViewPropType from "@gn/common/app/propType/googleLogin.view.propType";

function GoogleLoginWebView(props) {
  const { onGoogleLogin } = props;
  return (
    <button onClick={onGoogleLogin} className="btn btn-success">
      Google login
    </button>
  );
}
GoogleLoginWebView.propTypes = GoogleLoginViewPropType;

export default GoogleLoginWebView;
