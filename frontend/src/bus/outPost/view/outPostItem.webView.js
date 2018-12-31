import React from "react";

import OutPostItemHeadWebView from "./outPostItemHead.webView";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";
import PostItemFootWebStyle from "../../post/style/postItemFoot.webStyle";
import OutPostItemFootWebView from "./outPostItemFoot.webView";
import OutPostItemPropType from "@gn/common/bus/outPost/propType/outPostItem.propType";
import OutPostItemFootLogic from "@gn/common/bus/outPost/controller/outPostItemFoot.logic";

function OutPostItemWebView(props) {
  const {
    post,
    onUpdatePostClick,
    onDecidePostClick,
    onAwareReturnPostClick,
    isAwaringReturn
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

OutPostItemWebView.propTypes = OutPostItemPropType;

export default OutPostItemWebView;
