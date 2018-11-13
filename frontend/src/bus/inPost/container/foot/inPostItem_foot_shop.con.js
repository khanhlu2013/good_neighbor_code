import { connect } from "react-redux";
import PropTypes from "prop-types";

import InPostItemFootShop from "../../component/foot/inPostItem_foot_shop";
import requestInPost from "../../action/requestInPost.action";

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  return {
    postId,
    isRequestingPost: state.inPost.requestingPostIds.includes(postId)
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  requestPostHandler: postId => dispatch(requestInPost(postId))
});

const InPostItemFootShopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootShop);
InPostItemFootShopContainer.propTypes = {
  postId: PropTypes.string.isRequired
};
export default InPostItemFootShopContainer;
