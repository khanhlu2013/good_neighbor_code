import { connect } from "react-redux";
import InPostItemFootShop from "../../component/foot/inPostItem_foot_shop";
import requestInPost from "../../action/requestInPost.action";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isRequestingPost: state.inPost.requestingPostIds.includes(ownProps.postId)
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  requestPostHandler: postId => dispatch(requestInPost(postId))
});

const InPostItemFootShopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootShop);
export default InPostItemFootShopContainer;
