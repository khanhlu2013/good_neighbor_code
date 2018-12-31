import PropTypes from "prop-types";

const OutPostItemHeadPropType = {
  postId: PropTypes.string.isRequired,
  onUpdatePostClick: PropTypes.func.isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default OutPostItemHeadPropType;
