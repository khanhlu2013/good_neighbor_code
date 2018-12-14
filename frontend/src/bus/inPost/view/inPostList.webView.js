import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PostListNoData from "../../post/component/postListNoData";
import InPostItemWebView from "./inPostItem.webView";
import InPostListViewPropTypes from "@gn/common/bus/inPost/viewPropTypes/inPostListView.propTypes";
import InPostListController from "@gn/common/bus/inPost/controller/inPostList.controller";

const Style = styled.div`
  display: flex;
  flex-direction: column;
`;

function InPostListWebView(props) {
  const { listId, posts } = props;
  return (
    <Style id={listId}>
      <InPostListController
        posts={posts}
        inPostItemView={InPostItemWebView}
        noInPostDataIndicatorView={PostListNoData}
      />
    </Style>
  );
}
InPostListWebView.propTypes = InPostListViewPropTypes;

export default InPostListWebView;
