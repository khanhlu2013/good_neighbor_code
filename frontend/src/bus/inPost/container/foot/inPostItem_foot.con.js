import { connect } from "react-redux";
import PropTypes from "prop-types";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
import { __getRequestOrBorrowShare } from "./inPostItem_foot.selector";
import InPostItemFootWebView from "../../view/foot/inPostItem_foot.webView";
import AuthSelector from "@gn/common/app/selector/auth.selector";

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
const InPostItemFootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootWebView);
InPostItemFootContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

export default InPostItemFootContainer;
