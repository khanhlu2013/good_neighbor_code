import { connect } from "react-redux";
import PropTypes from "prop-types";

import awareApproveInPost from "../../action/awareApproveInPost.action";
import returnInPost from "../../action/returnInPost.action";
import InPostItemFootBorrow from "../component/inPostItem_foot_borrow";
import InPostSelector from "../../inPost.selector";

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
const InPostItemFootBorrowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootBorrow);
InPostItemFootBorrowContainer.propTypes = {
  myBorrowShareId: PropTypes.string.isRequired
};

export default InPostItemFootBorrowContainer;
