import PropTypes from "prop-types";

const OutPostListPropType = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  awaringReturnPostIds: PropTypes.array.isRequired,
  onOpenUpdatePostDialog: PropTypes.func.isRequired,
  onOpenDecidePostDialog: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired
};

export default OutPostListPropType;
