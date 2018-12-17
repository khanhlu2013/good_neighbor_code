import PropTypes from "prop-types";

const InPostManagementPropType = {
  //raw
  posts: PropTypes.array.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  isInitPosts: PropTypes.bool.isRequired,
  //calculated
  requestPosts: PropTypes.array.isRequired,
  borrowPosts: PropTypes.array.isRequired,
  approveAlertPosts: PropTypes.array.isRequired,
  returnShares: PropTypes.array.isRequired
};

export default InPostManagementPropType;
