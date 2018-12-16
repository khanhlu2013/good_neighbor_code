import { connect } from "react-redux";
import PropTypes from "prop-types";
import PassThroughView from "../../../../util/PassThrough.view";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
import AuthSelector from "@gn/common/app/selector/auth.selector";

export function __getRequestOrBorrowShare(post, userId) {
  //userBorrowShare
  const curBorrowShare = post.curBorrowShare;
  let userBorrowShare = null;
  if (curBorrowShare && curBorrowShare.borrower.id === userId) {
    userBorrowShare = curBorrowShare;
  }

  //myRequestShare
  const userRequestShare =
    post.requestShares.find(share => share.borrower.id === userId) || null;

  return {
    userBorrowShare,
    userRequestShare
  };
}

export const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const post = InPostSelector.post(state, postId);
  const loginUser = AuthSelector.loginUser(state);

  const {
    userBorrowShare: myBorrowShare,
    userRequestShare: myRequestShare
  } = __getRequestOrBorrowShare(post, loginUser.id);

  return {
    postId: post.id,
    myRequestShareId: myRequestShare ? myRequestShare.id : null,
    myBorrowShareId: myBorrowShare ? myBorrowShare.id : null,
    isActivePost: post.isActive
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({});
const InPostItemFootController = connect(
  mapStateToProps,
  mapDispatchToProps
)(PassThroughView);
InPostItemFootController.propTypes = {
  postId: PropTypes.string.isRequired
};

export default InPostItemFootController;
