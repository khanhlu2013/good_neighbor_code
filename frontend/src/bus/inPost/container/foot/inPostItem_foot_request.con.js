import { connect } from "react-redux";
import InPostItemFootRequest from "../../component/foot/inPostItem_foot_request";
import unRequestInPost from "../../action/unRequestInPost.action";

const mapStateToProps = (state, ownProps) => ({ ...ownProps });
const mapDispatchToProps = (dispatch, ownProps) => ({
  unRequestPostHandler: shareId => dispatch(unRequestInPost(shareId))
});
const InPostItemFootRequestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootRequest);

export default InPostItemFootRequestContainer;
