import PropTypes from "prop-types";
import Share from "../../../model/share";

const PostItemHistoryListViewPropType = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share))
};

export default PostItemHistoryListViewPropType;
