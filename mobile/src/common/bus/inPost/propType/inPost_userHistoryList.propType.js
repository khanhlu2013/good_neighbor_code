import PropTypes from "prop-types";
import Share from "../../../model/share";

const InPostUserHistoryListPropType = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired
};

export default InPostUserHistoryListPropType;
