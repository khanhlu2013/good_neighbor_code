import React, { Component } from "react";
import validator from "validator";
import PropTypes from "prop-types";

import { API } from "../../api/profile-api.js";
import { LoadingIcon } from "../../util.js";

class SearchByEmail extends Component {
  /**
   * Search email, then create or modify connection
   */
  state = {
    email: "", //email to search
    searchedUser: null,
    searchSubmited: false,
    isSearching: false
  };

  static getDerivedStateFromProps(props, state) {
    let searchedConnection = null;
    if (state.searchedUser && props.connections !== null) {
      const lst = props.connections.filter(
        connection =>
          (connection.from.id === state.searchedUser.id &&
            connection.to.id === props.loginUser.id) ||
          (connection.from.id === props.loginUser.id &&
            connection.to.id === state.searchedUser.id)
      );
      if (lst.length > 1) {
        throw Error("Unexpected duplicate connections");
      } else if (lst.length === 1) {
        searchedConnection = lst[0];
      }
    }
    const emailValid = validator.isEmail(state.email);
    const emailEmpty = state.email === "";
    const emailNotEmptyAndNotValid = !emailEmpty && !emailValid;
    const selfSearch = props.loginUser.email === state.email;
    return {
      searchedConnection,
      emailValid,
      emailEmpty,
      emailNotEmptyAndNotValid,
      selfSearch
    };
  }

  onSearchChange = event => {
    this.setState({ email: event.target.value, searchSubmited: false });
  };

  onSearchSubmit = event => {
    this.setState({
      searchSubmited: true,
      searchedUser: null
    });
    if (this.state.emailValid && !this.state.selfSearch) {
      this.setState({ isSearching: true });
      (async () => {
        const searchedUser = await API.searchEmail(this.state.email);
        this.setState({
          searchedUser,
          isSearching: false
        });
      })();
    }
    event.preventDefault();
  };

  render() {
    let msg = null;
    if (this.state.searchSubmited && this.state.emailEmpty) {
      msg = null; //ignore empty search text
    } else if (
      this.state.searchSubmited &&
      this.state.emailNotEmptyAndNotValid
    ) {
      msg = "Email is invalid!";
    } else if (this.state.selfSearch) {
      msg = "Can't add yourself as friend!";
    } else if (
      !this.state.searchedUser &&
      this.state.searchSubmited &&
      !this.state.isSearching &&
      this.state.emailValid &&
      !this.state.selfSearch
    ) {
      msg = "Result not found!";
    } else if (this.state.searchedUser) {
      msg = `Found ${this.state.searchedUser.name}, email: ${
        this.state.searchedUser.email
      }`;
    }

    return (
      <div id="SearchByEmail-react" className="text-center">
        <form onSubmit={this.onSearchSubmit}>
          <input
            type="text"
            placeholder="by email"
            value={this.state.email}
            onChange={this.onSearchChange}
          />
          {this.state.isSearching ? (
            <LoadingIcon text="searching" isAnimate={true} />
          ) : (
            <input className="btn btn-primary" type="submit" value="search" />
          )}
        </form>
        {msg && <p className="lead">{msg}</p>}

        {this.state.searchedUser && (
          <CrudConnectionControlPanel
            loginUser={this.props.loginUser}
            searchedUser={this.state.searchedUser}
            searchedConnection={this.state.searchedConnection}
            isCreatingConnection={this.props.isCreatingConnection}
            createConnectionCb={this.props.createConnectionCb}
          />
        )}
      </div>
    );
  }
}

SearchByEmail.propTypes = {
  loginUser: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  isCreatingConnection: PropTypes.bool.isRequired,
  createConnectionCb: PropTypes.func.isRequired
};

function CrudConnectionControlPanel(props) {
  const {
    loginUser,
    searchedUser,
    searchedConnection,
    isCreatingConnection,
    createConnectionCb
  } = props;

  const onCreateConnection = evt => {
    createConnectionCb(searchedUser.id);
  };

  let message = "";
  let action = null;

  if (
    /*you and searchedUser haven't exchanged invitation yet*/
    searchedConnection === null
  ) {
    if (isCreatingConnection) {
      action = (
        <LoadingIcon text={`Inviting ${searchedUser.name}`} isAnimate={true} />
      );
    } else {
      action = (
        <button
          className="btn btn-success"
          id="createConnectionBtn"
          onClick={onCreateConnection}
        >
          Invite {searchedUser.name}
        </button>
      );
    }
  } else {
    /*you and searchedUser have exchanged invitation*/
    if (
      /*you init the connection*/
      searchedConnection.from.id === loginUser.id
    ) {
      message = `You invited ${searchedUser.name}. `;
      if (
        /*but you changed your mind*/
        searchedConnection.approvedByFrom === false
      ) {
        message += `But you changed your mind.`;
      } else {
        /*and you havent changed your mind yet*/
        if (
          /*searchedUser haven't responsed you*/
          searchedConnection.approvedByTo === undefined
        ) {
          message += `Please wait for approval!`;
        } else if (
          /*searchedUser approved you*/
          searchedConnection.approvedByTo === true
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
        searchedConnection.approvedByFrom === false
      ) {
        message += `But changed his/her mind. Sorry!`;
      } else {
        /*and searchedUser havent changed her mind yet*/
        if (
          /*you havent responsed searchedUser*/
          searchedConnection.approvedByTo === undefined
        ) {
          message += `Please response.`;
        } else if (
          /*you approved searchedUser*/
          searchedConnection.approvedByTo === true
        ) {
          message += `And you accpected!`;
        } else {
          /*you denied searchedUser*/
          message += `And you denied.`;
        }
      }
    }
  }

  return (
    <div id="CrudConnectionControlPanel-react">
      {message}
      {action}
    </div>
  );
}

CrudConnectionControlPanel.propTypes = {
  loginUser: PropTypes.object.isRequired,
  searchedUser: PropTypes.object.isRequired,
  searchedConnection: PropTypes.object, //if null we can create connection
  isCreatingConnection: PropTypes.bool.isRequired,
  createConnectionCb: PropTypes.func.isRequired
};

export { SearchByEmail };
