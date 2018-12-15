import React from "react";
import PropTypes from "prop-types";
import Share from "../../../model/share";

function PostItemRequestListController(props) {
  const { shares, view } = props;
  const sortedShares = [...shares].sort(
    (s1, s2) => s1.dateCreate - s2.dateCreate
  );
  return React.createElement(view, { shares: sortedShares });
}
PostItemRequestListController.propTypes = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired,
  view: PropTypes.func.isRequired
};

export default PostItemRequestListController;
