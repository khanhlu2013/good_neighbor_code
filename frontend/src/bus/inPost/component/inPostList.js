import React from "react";
import PropTypes from "prop-types";
import { InPostItem } from "./inPostItem";
import PostListNoData from "../../post/component/postListNoData";
import InPostListController from "@gn/common/bus/inPost/controller/inPostList.controller";

function InPostList(props) {
  const { listId, posts } = props;
  return (
    <div id={listId}>
      <InPostListController
        posts={posts}
        inPostView={InPostItem}
        noInPostDataIndicatorView={PostListNoData}
      />
    </div>
  );
}
InPostList.propTypes = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
};

export default InPostList;
