import { connect } from "react-redux";
import PropTypes from "prop-types";

import requestInPost from "../../action/requestInPost.action";
import InPostItemFootShop from "../component/inPostItem_foot_shop";

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
