import React from "react";
import PropTypes from "prop-types";

function GoogleLoginController(props) {
  const { onGoogleLogin, view } = props;

  return React.createElement(view, { onGoogleLogin });
}
GoogleLoginController.propTypes = {
  onGoogleLogin: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};
export default GoogleLoginController;
