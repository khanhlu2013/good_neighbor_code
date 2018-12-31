import React from "react";
import PropTypes from "prop-types";

import OutPostItemHeadWebView from "./outPostItemHead.webView";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";
import PostItemFootWebStyle from "../../post/style/postItemFoot.webStyle";
import OutPostItemFootWebView from "./outPostItemFoot.webView";
import OutPostItemFootLogic from "@gn/common/bus/outPost/controller/outPostItemFoot.logic";

function OutPostItemWebView(props) {
  const {
    post,
    isAwaringReturn,
    onUpdatePostClick,
    onDecidePostClick,
    onAwareReturnPostClick
  } = props;
  const postId = post.id;

  return (
    <PostItemStyle id="outPost-item-react">
      <OutPostItemHeadWebView
        postId={postId}
        onUpdatePostClick={onUpdatePostClick}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyWebView post={post} />
      <PostItemFootWebStyle>
        <OutPostItemFootWebView
          postId={postId}
          //aware return
          isAwaringReturn={isAwaringReturn}
          borrowerOfTheLatestUnawareReturn={OutPostItemFootLogic.getBorrowerOfTheLatestUnawareReturn(
            post
          )}
          onAwareReturnPostClick={onAwareReturnPostClick}
          //decide
          isDecidablePost={OutPostItemFootLogic.isDecidablePost(post)}
          onDecidePostClick={onDecidePostClick}
        />
      </PostItemFootWebStyle>
    </PostItemStyle>
  );
}

OutPostItemWebView.propTypes = {
  post: PropTypes.object.isRequired,
  onUpdatePostClick: PropTypes.func.isRequired,
  onDecidePostClick: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export default OutPostItemWebView;
