import PropTypes from "prop-types";
import { nullOrRequiredValidator } from "../../../util";
import User from "../../../model/user";

const OutPostItemFootPropType = {
  postId: PropTypes.string.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired,
  borrowerOfTheLatestUnawareReturn: nullOrRequiredValidator("object", User),
  onAwareReturnPost: PropTypes.func.isRequired,
  isDecidablePost: PropTypes.bool.isRequired,
  onDecidePostClick: PropTypes.func.isRequired
};

export default OutPostItemFootPropType;
