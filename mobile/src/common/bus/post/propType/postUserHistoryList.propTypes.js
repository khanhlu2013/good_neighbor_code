import PropTypes from "prop-types";
import Share from "../../../model/share";

const PostUserHistoryListPropType = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired
};

export default PostUserHistoryListPropType;
