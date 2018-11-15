import { connect } from "react-redux";
import PropTypes from "prop-types";
import InPostItemFoot from "../component/inPostItem_foot";
import InPostSelector from "../../inPost.selector";
import AuthSelector from "../../../../app/auth.selector";

export const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const post = InPostSelector.post(state, postId);
  const loginUser = AuthSelector.loginUser(state);

  return {
    post,
    loginUserId: loginUser.id
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
