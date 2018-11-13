import { connect } from "react-redux";
import PropTypes from "prop-types";

import InPostItemFootRequest from "../../component/foot/inPostItem_foot_request";
import unRequestInPost from "../../action/unRequestInPost.action";

const mapStateToProps = (state, ownProps) => {
  const { myRequestShareId } = ownProps;

  return {
    myRequestShareId,
    isUnRequestingPost: state.inPost.deletingShareIds.includes(myRequestShareId)
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  unRequestPostHandler: shareId => dispatch(unRequestInPost(shareId))
});
const InPostItemFootRequestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootRequest);
InPostItemFootRequestContainer.propTypes = {
  myRequestShareId: PropTypes.string.isRequired
};

export default InPostItemFootRequestContainer;
