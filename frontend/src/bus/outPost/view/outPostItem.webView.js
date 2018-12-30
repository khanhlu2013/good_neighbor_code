import React from "react";
import PropTypes from "prop-types";

import OutPostItemHeadWebView from "./outPostItemHead.webView";
import LoadingIcon from "../../../share/loadingIcon";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";
import PostItemFootWebStyle from "../../post/style/postItemFoot.webStyle";

function OutPostItemWebView(props) {
  const {
    post,
    onOpenUpdatePostDialog,
    onOpenDecidePostDialog,
    isAwaringReturn,
    onAwareReturnPostClick
  } = props;

  function onDecidePostClick() {
    onOpenDecidePostDialog(post.id);
  }
  function onAwareReturnClick() {
    onAwareReturnPostClick(post.id);
  }
  function onUpdatePostClick() {
    onOpenUpdatePostDialog(post.id);
  }
  const curBorrowShare = post.curBorrowShare;

  return (
    <PostItemStyle id="outPost-item-react">
      <OutPostItemHeadWebView
        onUpdatePostClick={onUpdatePostClick}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyWebView post={post} />
      <PostItemFootWebStyle>
        {post.unawareReturnShareLatest && (
          <span>
            {isAwaringReturn ? (
              <LoadingIcon text={"confirming"} />
            ) : (
              <button
                id="outPostItem-awareReturnBtn-react"
                onClick={onAwareReturnClick}
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
      </PostItemFootWebStyle>
    </PostItemStyle>
  );
}

OutPostItemWebView.propTypes = {
  post: PropTypes.object.isRequired,
  onOpenUpdatePostDialog: PropTypes.func.isRequired,
  onOpenDecidePostDialog: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export default OutPostItemWebView;
