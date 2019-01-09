import PropTypes from "prop-types";
import User from "../../../model/user";
import { nullOrRequiredValidator } from "../../../util";
import Connection from "../../../model/connection";

const SearchByEmailResultDisplayPropType = {
  responseMessageAboutSearchResult: PropTypes.string.isRequired,
  searchedUser: PropTypes.instanceOf(User).isRequired,
  searchedConnection: nullOrRequiredValidator("object", Connection),
  isCreatingConnection: PropTypes.bool.isRequired,
  onCreateConnection: PropTypes.func.isRequired
};

export default SearchByEmailResultDisplayPropType;
