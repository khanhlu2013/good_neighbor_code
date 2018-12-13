import React from "react";
import PropTypes from "prop-types";

function InPostListController(props) {
  const {
    posts,
    inPostItemView,
    noInPostDataIndicatorView,
    wrapperView,
    listId
  } = props;

  let content;
  if (posts.length === 0) {
    content = React.createElement(noInPostDataIndicatorView, {});
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => React.createElement(inPostItemView, { key: post.id, post }));
  }
  return React.createElement(wrapperView, { id: listId }, content);
}
InPostListController.propTypes = {
  posts: PropTypes.array.isRequired,
  inPostItemView: PropTypes.func.isRequired,
  noInPostDataIndicatorView: PropTypes.func.isRequired,
  wrapperView: PropTypes.oneOfType([
    PropTypes.string, //div
    PropTypes.func, //stateless, class
    PropTypes.object //ReactNative.View
  ]),
  listId: PropTypes.string.isRequired
};

export default InPostListController;
