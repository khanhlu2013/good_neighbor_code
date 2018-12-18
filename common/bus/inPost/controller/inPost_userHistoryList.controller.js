import React from "react";
import PropTypes from "prop-types";
import Share from "../../../model/share";

function InPostUserHistoryListController(props) {
  const { shares, view } = props;
  const sortedShares = [...shares].sort(
    (s1, s2) => s2.dateReturn - s1.dateReturn
  );
  return React.createElement(view, { shares: sortedShares });
}

InPostUserHistoryListController.propTypes = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired,
  view: PropTypes.func.isRequired
};

export default InPostUserHistoryListController;
