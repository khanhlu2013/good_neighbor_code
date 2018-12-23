import connect from "react-redux/lib/connect/connect";

import { fetchOutPosts } from "@gn/common/bus/outPost/action/fetchOutPosts.action";
import { executeOkCrudPostDialog } from "@gn/common/bus/outPost/action/crudOutPost.action";
import {
  decideShare,
  undoDenyShare,
  undoApproveShare
} from "@gn/common/bus/outPost/action/decideOutPost.action";
import { awareReturnPost } from "@gn/common/bus/outPost/action/awareReturnPost.action";
import OutPostManagementComponentWebView from "../view/outPost_management.webView";
import OutPostSelector from "@gn/common/bus/outPost/outPost.selector";

const mapStateToProps = (state, ownProps) => {
  return {
    //raw data
    posts: OutPostSelector.posts(state),
    isInitPosts: OutPostSelector.isInitPosts(state),
    isFetchingPosts: OutPostSelector.isFetchingPosts(state),
    awaringReturnPostIds: OutPostSelector.awaringReturnPostIds(state),

    //derived data
    requestAlertPosts: OutPostSelector.requestAlertPosts(state),
    borrowPosts: OutPostSelector.borrowPosts(state),
    returnAlertPosts: OutPostSelector.returnAlertPosts(state),
    returnShares: OutPostSelector.returnShares(state)
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
