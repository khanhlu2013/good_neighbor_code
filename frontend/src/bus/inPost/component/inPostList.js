import React from "react";
import PropTypes from "prop-types";
import { InPostItem } from "./inPostItem";
import PostListNoData from "../../post/component/postListNoData";
import InPostListController from "@gn/common/bus/inPost/controller/inPostList.controller";

function InPostList(props) {
  const { listId, posts } = props;
  return (
    <InPostListController
      posts={posts}
      inPostItemView={InPostItem}
      noInPostDataIndicatorView={PostListNoData}
      wrapperView="div"
      listId={listId}
    />
  );
}
InPostList.propTypes = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
};

export default InPostList;
