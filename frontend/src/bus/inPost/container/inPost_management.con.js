import { connect } from "react-redux";
import InPostManagementComponent from "../component/inPost_management";
import fetchInPosts from "../action/fetchInPosts.action";
import InPostSelector from "../inPost.selector";

const mapStateToProps = (state, ownProps) => {
  const loginUser = state.auth.loginUser;
  const posts = state.inPost.posts;
  const approveAlertPosts = InPostSelector.approveAlertPosts(state);

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
    returnShares
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPosts: () => dispatch(fetchInPosts())
});

const InPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostManagementComponent);

export default InPostManagementContainer;
