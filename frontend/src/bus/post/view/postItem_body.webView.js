import React from "react";
import styled from "styled-components";

import PostItemRequestListWebView from "../view/postItem_requestlist.webView";
import PostItemHistoryListWebView from "./postItem_historyList.webView";
import PostItemHistoryListController from "@gn/common/bus/post/controller/postItem_historyList.controller";
import PostItemBodyMixin from "@gn/common/bus/post/style/postItemBody.mixin";
import PostItemBodyViewPropType from "@gn/common/bus/post/propType/postItemBody.view.propType";
import PostItemRequestListController from "@gn/common/bus/post/controller/postItem_requestList.controller";

const Style = styled.div`
  ${PostItemBodyMixin}
  display: flex;
`;

const PostItemRequestListStyle = styled.div`
  margin-top: 10px;
`;

const PostItemHistoryListStyle = styled.div`
  margin-top: 10px;
`;

function PostItemBodyWebView(props) {
  const { post } = props;
  const { title, description } = post;
  const curBorrowShare = post.curBorrowShare;
  const borrower = curBorrowShare ? curBorrowShare.borrower : null;

  return (
    <Style>
      <div>
        <span className="text-secondary font-weight-light">title: </span>
        {title}
      </div>
      <div>
        <span className="text-secondary font-weight-light">description: </span>
        {description}
      </div>
      {borrower && (
        <div className="text-left mt-1">
          <mark>
            <span className="text-muted font-weight-light">borrowing by: </span>
            {borrower.getNameAndEmail()}
          </mark>
        </div>
      )}
      {post.requestShares.length !== 0 && (
        <PostItemRequestListStyle>
          <PostItemRequestListController
            shares={post.requestShares}
            view={PostItemRequestListWebView}
          />
        </PostItemRequestListStyle>
      )}
      {post.returnShares.length !== 0 && (
        <PostItemHistoryListController
          shares={post.returnShares}
          view={PostItemHistoryListWebView}
        />
      )}
    </Style>
  );
}
PostItemBodyWebView.propTypes = PostItemBodyViewPropType;

export default PostItemBodyWebView;
