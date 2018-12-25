import React from "react";

function OutPostListController(props) {
  const { view, posts } = props;

  const sortedPosts = [...posts].sort(
    (p1, p2) => p2.dateCreate - p1.dateCreate
  );
  const newProps = { ...props, view: undefined, posts: sortedPosts };

  return React.createElement(view, newProps);
}

export default OutPostListController;
