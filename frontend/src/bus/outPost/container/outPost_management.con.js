import connect from "react-redux/lib/connect/connect";

import OutPostManagementComponent from "../component/outPost_management";
import fetchOutPosts from "../action/fetchOutPosts.action";
import {
  openUpdatePostDialog,
  openCreatePostDialog,
  executeOkCrudPostDialog,
  executeCancelCrudPostDialog
} from "../action/crudOutPost.action";
import {
  openDecisionDialog,
  exitDecisionDialog,
  decideShare,
  undoDenyShare,
  undoApproveShare
} from "../action/decideOutPost.action";
import { awareReturnPost } from "../action/awareReturnPost.action";
import {
  selectOutPostRequestAlert,
  selectOutPostReturnAlert
} from "../outPost.selector";

const mapStateToProps = (state, ownProps) => {
  let returnShares = [];
  let requestAlertPosts = [];
  let borrowPosts = [];
  let returnAlertPosts = [];

  const { posts, isInitPosts, isFetchingPosts } = state.outPost;
  const {
    crudPostDialogPrefill,
    isCrudingPost,
    isOpenCrudDialog
  } = state.outPost.crud;

  const {
    curDecidePost,
    isDecidingPost,
    isOpenDecisionDialog
  } = state.outPost.decide;
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

    //crud
    crudPostDialogPrefill,
    isCrudingPost,
    isOpenCrudDialog,

    //decide
    curDecidePost,
    isDecidingPost,
    isOpenDecisionDialog,

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
  onOpenUpdatePostDialog: post => dispatch(openUpdatePostDialog(post)),
  onOpenCreatePostDialog: () => dispatch(openCreatePostDialog()),
  onCrudDialogOk: (postId, title, description, isActive) =>
    dispatch(executeOkCrudPostDialog(postId, title, description, isActive)),
  onCrudDialogCancel: () => dispatch(executeCancelCrudPostDialog()),

  //decide
  onDecideShare: (shareId, isApprove) =>
    dispatch(decideShare(shareId, isApprove)),
  onUndoDenyShare: shareId => dispatch(undoDenyShare(shareId)),
  onUndoApproveShare: shareId => dispatch(undoApproveShare(shareId)),
  onOpenDecideDialog: post => dispatch(openDecisionDialog(post)),
  onExitDecisionDialog: () => dispatch(exitDecisionDialog()),

  //aware return post
  onAwareReturnPost: postId => dispatch(awareReturnPost(postId))
});

const OutPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OutPostManagementComponent);
export default OutPostManagementContainer;
