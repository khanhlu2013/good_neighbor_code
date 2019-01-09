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
      isSearching: false,
      isCreatingConnection: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onCreateConnection = this.onCreateConnection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { searchedUser, email, searchSubmited, isSearching } = state;
    const { connections, loginUser } = props;

    const emailValid = validator.isEmail(email);
    const selfSearch = loginUser.email === email;
    const searchedConnection = calculateSearchConnection(
      searchedUser,
      loginUser,
      connections
    );
    return {
      searchedConnection,
      responseMessageAboutSearchInput: calculateResponseMessageAboutSearchInput(
        emailValid,
        selfSearch,
        email,
        searchSubmited,
        isSearching,
        searchedUser
      ),
      responseMessageAboutSearchResult: calculateResponseMessageAboutSearchResult(
        searchedConnection,
        loginUser
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

  onCreateConnection(...args) {
    this.setState({ isCreatingConnection: true }, async () => {
      await this.props.onCreateConnection(...args);
      this.setState({ isCreatingConnection: false });
    });
  }

  render() {
    const { view, loginUser } = this.props;

    const {
      email,
      searchedUser,
      isSearching,
      isCreatingConnection
    } = this.state;

    const {
      searchedConnection,
      responseMessageAboutSearchInput,
      responseMessageAboutSearchResult
    } = this.state;

    const viewProps = {
      loginUser,

      //state
      email,
      searchedUser,
      isSearching,
      isCreatingConnection,

      //derived state
      searchedConnection,
      responseMessageAboutSearchInput,
      responseMessageAboutSearchResult,

      //handler
      onSearchChange: this.onSearchChange,
      onSearchSubmit: this.onSearchSubmit,
      onCreateConnection: this.onCreateConnection
    };
    return React.createElement(view, viewProps);
  }
}
SearchByEmailController.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  connections: PropTypes.arrayOf(PropTypes.instanceOf(Connection)).isRequired,
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
  } else {
    return null;
  }
}

function calculateResponseMessageAboutSearchResult(
  searchedConnection,
  loginUser
) {
  if (!searchedConnection) {
    return "You are not friends yet!";
  }

  const searchedUser = searchedConnection.getTheOtherUser(loginUser.id);
  let message;
  if (
    /*you init the connection*/
    searchedConnection.from.id === loginUser.id
  ) {
    message = `You invited ${searchedUser.name}. `;
    if (
      /*but you changed your mind*/
      searchedConnection.isApproveByFrom === false
    ) {
      message += `But you changed your mind.`;
    } else {
      /*and you havent changed your mind yet*/
      if (
        /*searchedUser haven't responsed you*/
        searchedConnection.isApproveByTo === undefined
      ) {
        message += `Please wait for approval!`;
      } else if (
        /*searchedUser approved you*/
        searchedConnection.isApproveByTo === true
      ) {
        message += `And you are friends!`;
      } else {
        /*searchedUser denided you*/
        message += `But sorry, you got denied!`;
      }
    }
  } else {
    /*searchedUser init the connection*/
    message = `${searchedUser.name} invited you. `;
    if (
      /*but searchedUser changed her mind*/
      searchedConnection.isApproveByFrom === false
    ) {
      message += `But changed his/her mind. Sorry!`;
    } else {
      /*and searchedUser havent changed her mind yet*/
      if (
        /*you havent responsed searchedUser*/
        searchedConnection.isApproveByTo === undefined
      ) {
        message += `Please response.`;
      } else if (
        /*you approved searchedUser*/
        searchedConnection.isApproveByTo === true
      ) {
        message += `And you accpected!`;
      } else {
        /*you denied searchedUser*/
        message += `And you denied.`;
      }
    }
  }

  return message;
}
