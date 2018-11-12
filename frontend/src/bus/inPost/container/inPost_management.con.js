import { connect } from "react-redux";
import InPostManagementComponent from "../component/inPost_management";
import requestInPost from "../action/requestInPost.action";
import unRequestInPost from "../action/unRequestInPost.action";
import fetchInPosts from "../action/fetchInPosts.action";
import { selectInPostApproveAlert } from "../inPost.selector";
import awareApproveInPost from "../action/awareApproveInPost.action";
import returnInPost from "../action/returnInPost.action";

const mapStateToProps = (state, ownProps) => {
  const loginUser = state.auth.loginUser;
  const posts = state.inPost.posts;
  const approveAlertPosts = selectInPostApproveAlert(posts, loginUser.id);

  const myInShares2D = posts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUser.id)
  );
  const myInShares1D = [].concat(...myInShares2D);
  const returnShares = myInShares1D.filter(share => share.isReturn);

  return {
    loginUser,
    posts,
    isFetchingPosts: state.inPost.isFetchingPosts,
    isInitPosts: state.inPost.isInitPosts,
    approveAlertPosts,
    returnShares,
    //pending work
    requestingPostIds: state.inPost.requestingPostIds,
    deletingShareIds: state.inPost.deletingShareIds,
    awaringShareIds: state.inPost.awaringShareIds,
    returningShareIds: state.inPost.returningShareIds
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPosts: () => dispatch(fetchInPosts()),
  requestPostHandler: postId => dispatch(requestInPost(postId)),
  unRequestPostHandler: shareId => dispatch(unRequestInPost(shareId)),
  awareApprovePostHandler: shareId => dispatch(awareApproveInPost(shareId)),
  returnPostHandler: shareId => dispatch(returnInPost(shareId))
});

const InPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostManagementComponent);

export default InPostManagementContainer;
