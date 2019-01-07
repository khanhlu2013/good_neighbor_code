import PropTypes from "prop-types";

import User from "../../../model/user";
import Connection from "../../../model/connection";
import { nullOrRequiredValidator } from "../../../util";

SearchByEmailPropTypes = {
  loginUser: PropTypes.instanceOf(User),
  isCreatingConnection: PropTypes.bool.isRequired,
  onCreateConnection: PropTypes.func.isRequired,

  //controller state
  email: PropTypes.string.isRequired,
  searchedUser: nullOrRequiredValidator("object", User),
  searchSubmited: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,

  //derived state
  searchedConnection: PropTypes.instanceOf(Connection),
  emailValid: PropTypes.bool.isRequired,
  emailEmpty: PropTypes.bool.isRequired,
  emailNotEmptyAndNotValid: PropTypes.bool.isRequired,
  selfSearch: PropTypes.bool.isRequired,

  //handler
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired
};

export default SearchByEmailPropTypes;
