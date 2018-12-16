import { connect } from "react-redux";
import PropTypes from "prop-types";
import PassThroughView from "../../../../util/PassThrough.view";

import InPostSelector from "@gn/common/bus/inPost/inPost.selector";
import returnInPost from "@gn/common/bus/inPost/action/returnInPost.action";
import awareApproveInPost from "@gn/common/bus/inPost/action/awareApproveInPost.action";

export const mapStateToProps = (state, ownProps) => {
  const shareId = ownProps.myBorrowShareId;
  const myBorrowShare = InPostSelector.share(state, shareId);

  return {
    myBorrowShareId: shareId,
    isAwareApproveBorrowShare: myBorrowShare.isAwareApprove,
    isAwaringShare: InPostSelector.isAwaringShare(state, shareId),
    isReturningShare: InPostSelector.isReturningShare(state, shareId)
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onAwareApprovePost: shareId => dispatch(awareApproveInPost(shareId)),
  onReturnPost: shareId => dispatch(returnInPost(shareId))
});

const InPostItemFootBorrowController = connect(
  mapStateToProps,
  mapDispatchToProps
)(PassThroughView);
InPostItemFootBorrowController.propTypes = {
  myBorrowShareId: PropTypes.string.isRequired
};

export default InPostItemFootBorrowController;
