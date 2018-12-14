import PropTypes from "prop-types";
import Share from "../../../model/share";

const PostItemRequestListViewPropType = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share))
};

export default PostItemRequestListViewPropType;
