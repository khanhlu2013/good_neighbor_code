import { connect } from "react-redux";
import awareApproveInPost from "../../action/awareApproveInPost.action";
import returnInPost from "../../action/returnInPost.action";
import InPostItemFootApprove from "../../component/foot/inPostItem_foot_approve";

const mapStateToProps = (state, ownProps) => {
  const shareId = ownProps.approveShare.id;

  return {
    ...ownProps,
    isAwaringShare: state.inPost.awaringShareIds.includes(shareId),
    isReturningShare: state.inPost.returningShareIds.includes(shareId)
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  awareApprovePostHandler: shareId => dispatch(awareApproveInPost(shareId)),
  returnPostHandler: shareId => dispatch(returnInPost(shareId))
});
const InPostItemFootApproveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootApprove);
export default InPostItemFootApproveContainer;
