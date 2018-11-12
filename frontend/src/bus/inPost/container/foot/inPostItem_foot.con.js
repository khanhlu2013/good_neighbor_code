import { connect } from "react-redux";
import PropTypes from "prop-types";

import InPostItemFoot from "../../component/foot/inPostItem_foot";

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const post = state.inPost.posts.find(post => post.id === postId);
  const currentlyBorrowShare = post.curBorrowShare;
  let myBorrowShareId = null;
  if (
    currentlyBorrowShare &&
    currentlyBorrowShare.borrower.id === state.auth.loginUser.id
  ) {
    myBorrowShareId = currentlyBorrowShare.id;
  }
  const myRequestShare =
    post.requestShares.find(
      share => share.borrower.id === state.auth.loginUser.id
    ) || null;

  return {
    ...ownProps,
    myBorrowShareId,
    myRequestShareId: myRequestShare ? myRequestShare.id : null,
    isActive: post.isActive
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({});
const InPostItemFootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFoot);
InPostItemFootContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

export default InPostItemFootContainer;
