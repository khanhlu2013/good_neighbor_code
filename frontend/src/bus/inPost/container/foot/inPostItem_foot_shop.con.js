import { connect } from "react-redux";
import PropTypes from "prop-types";

import InPostSelector from "../../inPost.selector";
import InPostItemFootShop from "../../component/foot/inPostItem_foot_shop";
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

const InPostItemFootShopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootShop);
InPostItemFootShopContainer.propTypes = {
  postId: PropTypes.string.isRequired
};
export default InPostItemFootShopContainer;
