import PropTypes from "prop-types";

const InPostItemFootBorrowViewPropType = {
  myBorrowShareId: PropTypes.string.isRequired,
  isAwareApproveBorrowShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};

export default InPostItemFootBorrowViewPropType;
