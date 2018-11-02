import React from "react";
import PropTypes from "prop-types";

import LoadingIcon from "../../share/loadingIcon";
import PostItemBody from "../post/component/postItem_body";
import PostItemFootStyle from "../post/component/style/postItem_foot_style";
import PostItemStyle from "../post/component/style/postItem_style";
import OutPostItemHead from "./outPostItem_head";

function OutPostItem(props) {
  const {
    post,
    onEditPost,
    onDecidePost,
    isAwaringReturn,
    onAwareReturnPost
  } = props;

  const onEditBtnClicked = e => {
    onEditPost(post);
  };

  const onDecidePostClick = e => {
    onDecidePost(post);
  };

  const onAwareReturnClick = e => {
    onAwareReturnPost(post.id);
  };

  const curBorrowShare = post.curBorrowShare;

  return (
    <PostItemStyle id="outPost-item-react">
      <OutPostItemHead
        onEditPost={onEditBtnClicked}
        dateCreate={post.dateCreate}
      />
      <PostItemBody post={post} />
      <PostItemFootStyle>
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
      </PostItemFootStyle>
    </PostItemStyle>
  );
}

OutPostItem.propTypes = {
  post: PropTypes.object.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired,
  onAwareReturnPost: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export { OutPostItem };
