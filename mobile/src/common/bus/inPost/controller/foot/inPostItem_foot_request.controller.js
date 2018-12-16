import { connect } from "react-redux";
import PropTypes from "prop-types";
import PassThroughView from "../../../../util/PassThrough.view";

import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
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

const InPostItemFootRequestController = connect(
  mapStateToProps,
  mapDispatchToProps
)(PassThroughView);
InPostItemFootRequestController.propTypes = {
  myRequestShareId: PropTypes.string.isRequired
};

export default InPostItemFootRequestController;
