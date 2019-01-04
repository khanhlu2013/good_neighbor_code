import PropTypes from "prop-types";

const OutPostListPropType = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  awaringReturnPostIds: PropTypes.array.isRequired,
  onUpdatePostClick: PropTypes.func.isRequired,
  onDecidePostClick: PropTypes.func.isRequired,
  onAwareReturnPost: PropTypes.func.isRequired
};

export default OutPostListPropType;
