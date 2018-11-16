import { connect } from "react-redux";
import PropTypes from "prop-types";
import InPostItemFoot from "../component/inPostItem_foot";
import InPostSelector from "../../inPost.selector";
import AuthSelector from "../../../../app/auth.selector";
import { __getRequestOrBorrowShare } from "./inPostItem_foot.selector";

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
)(InPostItemFoot);
InPostItemFootContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

export default InPostItemFootContainer;
