import { connect } from "react-redux";
import PropTypes from "prop-types";
import PassThroughView from "../../../../util/PassThrough.view";
import InPostSelector from "../../inPost.selector";
import requestInPost from "../../action/requestInPost.action";

export const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  return {
    postId,
    isRequestingPost: InPostSelector.isRequestingPost(state, postId)
  };
};
export const mapDispatchToProps = (dispatch, ownProps) => ({
  onRequestPost: postId => dispatch(requestInPost(postId))
});

const InPostItemFootShopController = connect(
  mapStateToProps,
  mapDispatchToProps
)(PassThroughView);
InPostItemFootShopController.propTypes = {
  postId: PropTypes.string.isRequired
};
export default InPostItemFootShopController;
