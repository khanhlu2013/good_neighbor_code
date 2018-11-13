import { connect } from "react-redux";
import PropTypes from "prop-types";

import awareApproveInPost from "../../action/awareApproveInPost.action";
import returnInPost from "../../action/returnInPost.action";
import InPostItemFootBorrow from "../../component/foot/inPostItem_foot_borrow";

const mapStateToProps = (state, ownProps) => {
  const shareId = ownProps.myBorrowShareId;
  const post = state.inPost.posts.find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const share = post.shares.find(share => share.id === shareId);

  return {
    myBorrowShare: share,
    isAwareApprove: share.isAwareApprove,
    isAwaringShare: state.inPost.awaringShareIds.includes(shareId),
    isReturningShare: state.inPost.returningShareIds.includes(shareId)
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  awareApprovePostHandler: shareId => dispatch(awareApproveInPost(shareId)),
  returnPostHandler: shareId => dispatch(returnInPost(shareId))
});
const InPostItemFootBorrowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostItemFootBorrow);
InPostItemFootBorrowContainer.propTypes = {
  myBorrowShareId: PropTypes.string.isRequired
};

export default InPostItemFootBorrowContainer;
