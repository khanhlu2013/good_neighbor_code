import { connect } from "react-redux";
import InPostManagementComponent from "../component/inPost_management";
import requestInPost from "../action/requestInPost.action";
import unRequestInPost from "../action/unRequestInPost.action";
import fetchInPosts from "../action/fetchInPosts.action";
import filterInPostApproveAlert from "../alert/filterInPostApproveAlert";

const mapStateToProps = (state, ownProps) => {
  const loginUser = state.auth.loginUser;
  const posts = state.inPost.posts;
  const approveAlertPosts = filterInPostApproveAlert(posts, loginUser.id);

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
    approveAlertPostCount: approveAlertPosts.length,
    returnShares,
    requestingPostIds: state.inPost.requestingPostIds,
    deletingShareIds: state.inPost.deletingShareIds
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRequestPost: postId => dispatch(requestInPost(postId)),
  onUnRequestPost: shareId => dispatch(unRequestInPost(shareId)),
  fetchInPosts: () => dispatch(fetchInPosts())
});

const InPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostManagementComponent);

export default InPostManagementContainer;
