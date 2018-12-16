import PropTypes from "prop-types";
import { nullOrRequiredValidator } from "../../../../util";

const InPostItemFootViewPropType = {
  postId: PropTypes.string.isRequired,
  myRequestShareId: nullOrRequiredValidator("string"),
  myBorrowShareId: nullOrRequiredValidator("string"),
  isActivePost: PropTypes.bool.isRequired
};

export default InPostItemFootViewPropType;
