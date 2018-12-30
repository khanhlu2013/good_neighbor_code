import PropTypes from "prop-types";

const OutPostItemHeadPropType = {
  onUpdatePostClick: PropTypes.func.isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default OutPostItemHeadPropType;
