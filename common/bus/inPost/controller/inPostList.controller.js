import React from "react";
import PropTypes from "prop-types";

function InPostListController(props) {
  const { posts, inPostView, noInPostDataIndicatorView } = props;

  let content;
  if (posts.length === 0) {
    content = React.createElement(noInPostDataIndicatorView, {});
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => React.createElement(inPostView, { key: post.id, post }));
  }

  return content;
}
InPostListController.propTypes = {
  posts: PropTypes.array.isRequired,
  inPostView: PropTypes.func.isRequired,
  noInPostDataIndicatorView: PropTypes.func.isRequired
};

export default InPostListController;
