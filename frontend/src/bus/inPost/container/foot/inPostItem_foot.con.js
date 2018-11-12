import { connect } from "react-redux";
import InPostItemFoot from "../../component/foot/inPostItem_foot";

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const post = state.inPost.posts.find(post => post.id === postId);
  const currentlyBorrowShare = post.curBorrowShare;
  let myBorrowShare = null;
  if (
    currentlyBorrowShare &&
    currentlyBorrowShare.borrower.id === state.auth.loginUser.id
  ) {
    myBorrowShare = currentlyBorrowShare;
  }
  const myRequestShare =
    post.requestShares.find(
      share => share.borrower.id === state.auth.loginUser.id
    ) || null;

  return {
    ...ownProps,
    myBorrowShare,
    myRequestShareId: myRequestShare ? myRequestShare.id : null,
    isActive: post.isActive
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({});
const InPostItemFootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFoot);
export default InPostItemFootContainer;
