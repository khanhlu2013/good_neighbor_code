import connect from "react-redux/lib/connect/connect";

import {
  selectOutPostRequestAlert,
  selectOutPostReturnAlert
} from "@gn/common/bus/outPost/outPost.selector";
import { fetchOutPosts } from "@gn/common/bus/outPost/action/fetchOutPosts.action";
import { executeOkCrudPostDialog } from "@gn/common/bus/outPost/action/crudOutPost.action";
import {
  decideShare,
  undoDenyShare,
  undoApproveShare
} from "@gn/common/bus/outPost/action/decideOutPost.action";
import { awareReturnPost } from "@gn/common/bus/outPost/action/awareReturnPost.action";
import OutPostManagementComponentWebView from "../view/outPost_management.webView";

const mapStateToProps = (state, ownProps) => {
  let returnShares = [];
  let requestAlertPosts = [];
  let borrowPosts = [];
  let returnAlertPosts = [];

  const { posts, isInitPosts, isFetchingPosts } = state.outPost;

  if (isInitPosts) {
    const returnShares2D = posts.map(post =>
      post.shares.filter(share => share.isReturn)
    );
    returnShares = [].concat(...returnShares2D);

    requestAlertPosts = selectOutPostRequestAlert(posts);
    borrowPosts = posts.filter(post => post.curBorrowShare);
    returnAlertPosts = selectOutPostReturnAlert(posts);
  }

  return {
    posts,
    isInitPosts,
    isFetchingPosts,

    //derived data
    returnShares,
    requestAlertPosts,
    borrowPosts,
    returnAlertPosts,

    //aware return
    awaringReturnPostIds: state.outPost.awaringReturnPostIds
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  //fetch posts
  fetchPosts: () => dispatch(fetchOutPosts()),

  //crud
  onCrudDialogOk: (postId, title, description, isActive) =>
    dispatch(executeOkCrudPostDialog(postId, title, description, isActive)),

  //decide
  onDecideShare: (shareId, isApprove) =>
    dispatch(decideShare(shareId, isApprove)),
  onUndoDenyShare: shareId => dispatch(undoDenyShare(shareId)),
  onUndoApproveShare: shareId => dispatch(undoApproveShare(shareId)),

  //aware return post
  onAwareReturnPost: postId => dispatch(awareReturnPost(postId))
});

const OutPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OutPostManagementComponentWebView);
export default OutPostManagementContainer;
