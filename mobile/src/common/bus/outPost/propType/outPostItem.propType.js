import PropTypes from "prop-types";

const OutPostItemPropType = {
  post: PropTypes.object.isRequired,
  onUpdatePostClick: PropTypes.func.isRequired,
  onDecidePostClick: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export default OutPostItemPropType;
