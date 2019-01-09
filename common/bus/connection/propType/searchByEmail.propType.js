import PropTypes from "prop-types";

import User from "../../../model/user";
import Connection from "../../../model/connection";
import { nullOrRequiredValidator } from "../../../util";

const SearchByEmailPropType = {
  loginUser: PropTypes.instanceOf(User),
  isCreatingConnection: PropTypes.bool.isRequired,
  onCreateConnection: PropTypes.func.isRequired,

  //controller state
  email: PropTypes.string.isRequired,
  searchedUser: nullOrRequiredValidator("object", User),
  isSearching: PropTypes.bool.isRequired,

  //derived state
  searchedConnection: PropTypes.instanceOf(Connection),
  responseMessageAboutSearchInput: nullOrRequiredValidator("string"),
  responseMessageAboutSearchConnectionResult: nullOrRequiredValidator("string"),

  //handler
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired
};

export default SearchByEmailPropType;
