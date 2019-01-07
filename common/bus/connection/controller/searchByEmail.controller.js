import React, { Component } from "react";
import PropTypes from "prop-types";
import validator from "validator";

import User from "../../../model/user";
import Connection from "../../../model/connection";
import API from "../../../api";

class SearchByEmailController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      searchedUser: null,
      searchSubmited: false,
      isSearching: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { searchedUser, email, searchSubmited, isSearching } = state;
    const { connections, loginUser } = props;

    const emailValid = validator.isEmail(email);
    const selfSearch = loginUser.email === email;

    return {
      searchedConnection: calculateSearchConnection(
        searchedUser,
        loginUser,
        connections
      ),
      responseMessageAboutSearchInput: calculateResponseMessageAboutSearchInput(
        emailValid,
        selfSearch,
        email,
        searchSubmited,
        isSearching,
        searchedUser
      ),
      emailValid,
      selfSearch
    };
  }

  onSearchChange(value) {
    this.setState({ email: value, searchSubmited: false });
  }

  onSearchSubmit() {
    const { email, emailValid, selfSearch } = this.state;
    const trimEmail = email.trim();

    this.setState({
      searchSubmited: true,
      searchedUser: null,
      email: trimEmail
    });

    if (emailValid && !selfSearch) {
      this.setState({ isSearching: true });
      (async () => {
        const searchedUser = await API.searchEmail(trimEmail);
        this.setState({
          searchedUser,
          isSearching: false
        });
      })();
    }
  }

  render() {
    const {
      view,
      loginUser,
      onCreateConnection,
      isCreatingConnection
    } = this.props;

    const { email, searchedUser, isSearching } = this.state;

    const { searchedConnection, responseMessageAboutSearchInput } = this.state;

    const viewProps = {
      loginUser,
      isCreatingConnection,
      onCreateConnection,

      //state
      email,
      searchedUser,
      isSearching,

      //derived state
      searchedConnection,
      responseMessageAboutSearchInput,

      //handler
      onSearchChange: this.onSearchChange,
      onSearchSubmit: this.onSearchSubmit
    };
    return React.createElement(view, viewProps);
  }
}
SearchByEmailController.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  connections: PropTypes.arrayOf(PropTypes.instanceOf(Connection)).isRequired,
  isCreatingConnection: PropTypes.bool.isRequired,
  onCreateConnection: PropTypes.func.isRequired
};

export default SearchByEmailController;

// - helper
function calculateResponseMessageAboutSearchInput(
  emailValid,
  selfSearch,
  email,
  searchSubmited,
  isSearching,
  searchedUser
) {
  const emailEmpty = email === "";
  const emailNotEmptyAndNotValid = !emailEmpty && !emailValid;

  let message = null;
  if (searchSubmited && emailEmpty) {
    message = null; //ignore empty search text
  } else if (searchSubmited && emailNotEmptyAndNotValid) {
    message = "Email is invalid!";
  } else if (searchSubmited && selfSearch) {
    message = "Can't add yourself as friend!";
  } else if (
    searchSubmited &&
    emailValid &&
    !isSearching &&
    !selfSearch &&
    !searchedUser
  ) {
    message = "Result not found!";
  } else if (searchedUser) {
    message = `Found ${searchedUser.name}, email: ${searchedUser.email}`;
  }

  return message;
}

function calculateSearchConnection(searchedUser, loginUser, connections) {
  if (!searchedUser) {
    return null;
  }

  const lst = connections.filter(
    connection =>
      (connection.from.id === searchedUser.id &&
        connection.to.id === loginUser.id) ||
      (connection.from.id === loginUser.id &&
        connection.to.id === searchedUser.id)
  );
  if (lst.length > 1) {
    throw Error("Unexpected duplicate connections");
  } else if (lst.length === 1) {
    return lst[0];
  }
}
