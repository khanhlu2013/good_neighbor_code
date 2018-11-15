import { connect } from "react-redux";
import PropTypes from "prop-types";

import requestInPost from "../../action/requestInPost.action";
import InPostItemFootShop from "../component/inPostItem_foot_shop";
import InPostSelector from "../../inPost.selector";

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

const InPostItemFootShopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootShop);
InPostItemFootShopContainer.propTypes = {
  postId: PropTypes.string.isRequired
};
export default InPostItemFootShopContainer;
