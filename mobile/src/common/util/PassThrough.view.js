import React from "react";
import PropTypes from "prop-types";

function PassThroughView(props) {
  const { view } = props;
  return React.createElement(view, props);
}
PassThroughView.propTypes = {
  view: PropTypes.func.isRequired
};
export default PassThroughView;
