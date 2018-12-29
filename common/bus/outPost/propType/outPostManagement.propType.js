import PropTypes from "prop-types";

const OutPostManagementPropType = {
  //data
  posts: PropTypes.array.isRequired,
  isInitPosts: PropTypes.bool.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  awaringReturnPostIds: PropTypes.array.isRequired,

  //derived data
  requestAlertPosts: PropTypes.array.isRequired,
  borrowPosts: PropTypes.array.isRequired,
  returnAlertPosts: PropTypes.array.isRequired,
  returnShares: PropTypes.array.isRequired,

  //crud post
  onCreateOrUpdatePost: PropTypes.func.isRequired,

  //decide post
  onDecideShare: PropTypes.func.isRequired,
  onUndoDenyShare: PropTypes.func.isRequired,
  onUndoApproveShare: PropTypes.func.isRequired,

  //aware return post
  onAwareReturnPost: PropTypes.func.isRequired
};

export default OutPostManagementPropType;
