import { connect } from "react-redux";
import PropTypes from "prop-types";

import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
import requestInPost from "@gn/common/bus/inPost/action/requestInPost.action";
import InPostItemFootShopWebView from "../../view/foot/inPostItem_foot_shop.webView";

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
)(InPostItemFootShopWebView);
InPostItemFootShopContainer.propTypes = {
  postId: PropTypes.string.isRequired
};
export default InPostItemFootShopContainer;
