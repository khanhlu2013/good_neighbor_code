import React from "react";
import OutPostItemHeadMobileView from "./outPostItemHead.mobileView";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyMobileView from "../../post/view/postItem_body.mobileView";
import PostItemFootMobileStyle from "../../post/style/postItemFoot.mobileStyle";
import OutPostItemFootMobileView from "./outPostItemFoot.mobileView";
import OutPostItemFootLogic from "../../../common/bus/outPost/controller/outPostItemFoot.logic";

function OutPostItemMobileView(props) {
  const {
    post,
    onUpdatePostClick,
    onDecidePostClick,
    onAwareReturnPost,
    isAwaringReturn
  } = props;
  const postId = post.id;

  return (
    <PostItemStyle>
      <OutPostItemHeadMobileView
        postId={post.id}
        onUpdatePostClick={onUpdatePostClick}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyMobileView post={post} />
      <PostItemFootMobileStyle>
        <OutPostItemFootMobileView
          postId={postId}
          //aware return
          isAwaringReturn={isAwaringReturn}
          borrowerOfTheLatestUnawareReturn={OutPostItemFootLogic.getBorrowerOfTheLatestUnawareReturn(
            post
          )}
          onAwareReturnPost={onAwareReturnPost}
          //decide
          isDecidablePost={OutPostItemFootLogic.isDecidablePost(post)}
          onDecidePostClick={onDecidePostClick}
        />
      </PostItemFootMobileStyle>
    </PostItemStyle>
  );
}

export default OutPostItemMobileView;
