import { connect } from "react-redux";
import PropTypes from "prop-types";
import BaseView from "../../../../util/BaseView";

import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
import requestInPost from "@gn/common/bus/inPost/action/requestInPost.action";

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
)(BaseView);
InPostItemFootShopController.propTypes = {
  postId: PropTypes.string.isRequired
};
export default InPostItemFootShopController;
