import React from "react";
import styled from "styled-components";

import PostItemHistoryList from "../component/postItem_historyList";
import PostItemRequestList from "../component/postItem_requestlist";
import PostItemBodyMixin from "@gn/common/bus/post/style/postItemBody.mixin";
import PostItemBodyViewPropTypes from "@gn/common/bus/post/viewPropTypes/postItemBody.view.propTypes";

const Style = styled.div`
  ${PostItemBodyMixin}
  display: flex;
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
        <PostItemRequestList shares={post.requestShares} />
      )}
      {post.returnShares.length !== 0 && (
        <PostItemHistoryList shares={post.returnShares} />
      )}
    </Style>
  );
}
PostItemBodyWebView.propTypes = PostItemBodyViewPropTypes;

export default PostItemBodyWebView;
