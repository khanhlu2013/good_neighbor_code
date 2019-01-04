import PropTypes from "prop-types";
import Share from "../../../model/share";

const OutPostUserHistoryListPropType = {
  shares: PropTypes.arrayOf(Share).isRequired
};

export default OutPostUserHistoryListPropType;
