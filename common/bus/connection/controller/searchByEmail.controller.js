import React, { Component } from "react";
import PropTypes from "prop-types";
import validator from "validator";

import User from "../../../model/user";
import Connection from "../../../model/connection";
import API from "../../../api";

function getSearchConnection(searchedUser, loginUser, connections) {
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
    const { searchedUser, email } = state;
    const { connections, loginUser } = props;

    const emailValid = validator.isEmail(state.email);
    const emailEmpty = state.email === "";
    const emailNotEmptyAndNotValid = !emailEmpty && !emailValid;
    const selfSearch = loginUser.email === email;

    return {
      searchedConnection: getSearchConnection(
        searchedUser,
        loginUser,
        connections
      ),
      emailValid,
      emailEmpty,
      emailNotEmptyAndNotValid,
      selfSearch
    };
  }

  onSearchChange(value) {
    this.setState({ email: value, searchSubmited: false });
  }

  async onSearchSubmit() {
    const { email, emailValid, selfSearch } = this.state;
    const trimEmail = email.trim();

    this.setState({
      searchSubmited: true,
      searchedUser: null,
      email: trimEmail
    });

    if (emailValid && !selfSearch) {
      this.setState({ isSearching: true });
      const searchedUser = await API.searchEmail(trimEmail);
      this.setState({
        searchedUser,
        isSearching: false
      });
    }
  }

  render() {
    const {
      view,
      loginUser,
      onCreateConnection,
      isCreatingConnection
    } = this.props;

    const { email, searchedUser, searchSubmited, isSearching } = this.state;

    const {
      searchedConnection,
      emailValid,
      emailEmpty,
      emailNotEmptyAndNotValid,
      selfSearch
    } = this.state;

    const viewProps = {
      loginUser,
      isCreatingConnection,
      onCreateConnection,

      //state
      email,
      searchedUser,
      searchSubmited,
      isSearching,

      //derived state
      searchedConnection,
      emailValid,
      emailEmpty,
      emailNotEmptyAndNotValid,
      selfSearch,

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
