import PropTypes from "prop-types";

const OutPostManagementPropType = {
  //data
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  isInitPosts: PropTypes.bool.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,

  //derived data
  returnShares: PropTypes.array.isRequired,
  requestAlertPosts: PropTypes.array.isRequired,
  borrowPosts: PropTypes.array.isRequired,
  returnAlertPosts: PropTypes.array.isRequired,

  //crud post
  onCreateOrUpdatePost: PropTypes.func.isRequired,

  //decide post
  onDecideShare: PropTypes.func.isRequired,
  onUndoDenyShare: PropTypes.func.isRequired,
  onUndoApproveShare: PropTypes.func.isRequired,

  //aware return post
  onAwareReturnPost: PropTypes.func.isRequired,
  awaringReturnPostIds: PropTypes.array.isRequired
};

export default OutPostManagementPropType;
