import React from "react";
import PropTypes from "prop-types";

import PostItemBody from "../../post/component/postItem_body";
import OutPostItemHead from "./outPostItem_head";
import LoadingIcon from "../../../share/loadingIcon";
import PostItemFootStyle from "../../post/style/postItem_foot_style";
import PostItemStyle from "../../post/style/postItem_style";

function OutPostItem(props) {
  const {
    post,
    onUpdatePost,
    onDecidePost,
    isAwaringReturn,
    onAwareReturnPostClick
  } = props;

  const onUpdateBtnClicked = e => {
    onUpdatePost(post);
  };

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
        onUpdatePost={onUpdateBtnClicked}
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
  onUpdatePost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export default OutPostItem;
