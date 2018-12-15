import React from "react";
import PropTypes from "prop-types";

function BaseView(props) {
  const { view } = props;
  return React.createElement(view, props);
}
BaseView.propTypes = {
  view: PropTypes.func.isRequired
};
export default BaseView;
