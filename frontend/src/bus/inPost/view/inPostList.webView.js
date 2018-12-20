import React from "react";
import styled from "styled-components";

import InPostItemWebView from "./inPostItem.webView";
import PostListNoDataWebView from "../../post/view/postListNoData.webView";
import InPostListViewPropType from "@gn/common/bus/inPost/propType/inPostList.view.propType";
import InPostListController from "@gn/common/bus/inPost/controller/inPostList.controller";

const Style = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

function _renderProp(posts) {
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataWebView />;
  } else {
    content = posts.map(post => (
      <Style key={post.id}>
        <InPostItemWebView post={post} />
      </Style>
    ));
  }
  return content;
}

function InPostListWebView(props) {
  const { listId, posts } = props;
  return (
    <div id={listId}>
      <InPostListController posts={posts} renderProp={_renderProp} />
    </div>
  );
}
InPostListWebView.propTypes = InPostListViewPropType;

export default InPostListWebView;
