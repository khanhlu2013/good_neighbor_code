import PropTypes from "prop-types";

const InPostItemFootRequestViewPropType = {
  myRequestShareId: PropTypes.string.isRequired,
  isUnRequestingPost: PropTypes.bool.isRequired,
  onUnRequestPost: PropTypes.func.isRequired
};

export default InPostItemFootRequestViewPropType;
