import { connect } from "react-redux";
import PropTypes from "prop-types";

import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
import InPostItemFootRequest from "../../component/foot/inPostItem_foot_request";
import unRequestInPost from "@gn/common/bus/inPost/action/unRequestInPost.action";

export const mapStateToProps = (state, ownProps) => {
  const { myRequestShareId } = ownProps;

  return {
    myRequestShareId,
    isUnRequestingPost: InPostSelector.isUnRequestingPost(state)
  };
};
export const mapDispatchToProps = (dispatch, ownProps) => ({
  onUnRequestPost: shareId => dispatch(unRequestInPost(shareId))
});
const InPostItemFootRequestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootRequest);
InPostItemFootRequestContainer.propTypes = {
  myRequestShareId: PropTypes.string.isRequired
};

export default InPostItemFootRequestContainer;
