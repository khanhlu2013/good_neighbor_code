import PropTypes from "prop-types";

const InPostItemFootShopViewPropType = {
  postId: PropTypes.string.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onRequestPost: PropTypes.func.isRequired
};

export default InPostItemFootShopViewPropType;
