import React from "react";
import PropTypes from "prop-types";

import OutPostItemHead from "./outPostItem_head";
import LoadingIcon from "../../../share/loadingIcon";
import PostItemFootStyle from "../../post/style/postItem_foot_style";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";

function OutPostItem(props) {
  const {
    post,
    onOpenUpdatePostDialog,
    onDecidePost,
    isAwaringReturn,
    onAwareReturnPostClick
  } = props;

  const onDecidePostClick = e => {
    onDecidePost(post);
  };

  const _onAwareReturnClick = e => {
    onAwareReturnPostClick(post.id);
  };

  const curBorrowShare = post.curBorrowShare;

  return (
    <PostItemStyle id="outPost-item-react">
      <OutPostItemHead
        postId={post.id}
        onOpenUpdatePostDialog={onOpenUpdatePostDialog}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyWebView post={post} />
      <PostItemFootStyle>
        {post.unawareReturnShareLatest && (
          <span>
            {isAwaringReturn ? (
              <LoadingIcon text={"confirming"} />
            ) : (
              <button
                id="outPostItem-awareReturnBtn-react"
                onClick={_onAwareReturnClick}
                className="btn btn-sm btn-success"
              >
                {`confirm returned by ${post.unawareReturnShareLatest.borrower.getNameAndEmail()}`}
              </button>
            )}
          </span>
        )}
        {(post.denyShares.length !== 0 ||
          post.requestShares.length !== 0 ||
          curBorrowShare) && (
          <button
            id="outPostItem-decisionBtn-react"
            onClick={onDecidePostClick}
            className="btn btn-sm btn-success ml-1"
          >
            share
          </button>
        )}
      </PostItemFootStyle>
    </PostItemStyle>
  );
}

OutPostItem.propTypes = {
  post: PropTypes.object.isRequired,
  onOpenUpdatePostDialog: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export default OutPostItem;
