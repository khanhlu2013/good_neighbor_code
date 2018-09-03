import React, { Component } from "react";
import validator from "validator";
import PropTypes from "prop-types";

import { API } from "../../api/profile-api.js";

class SearchByEmail extends Component {
  /**
   * Search email, then create or modify connection
   */
  state = {
    email: "", //email to search
    searchedUser: null,
    searchSubmited: false,
    searchResponsed: true
  };

  static getDerivedStateFromProps(props, state) {
    let searchedConnection = null;
    if (state.searchedUser && props.connections !== null) {
      const lst = props.connections.filter(
        connection =>
          (connection.from._id === state.searchedUser.id &&
            connection.to._id === props.loginUser.id) ||
          (connection.from._id === props.loginUser.id &&
            connection.to._id === state.searchedUser.id)
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
    this.setState({ email: event.currentTarget.value, searchSubmited: false });
  };

  onSearchSubmit = event => {
    this.setState({
      searchSubmited: true,
      searchedUser: null
    });
    if (!this.state.selfSearch && this.state.emailValid) {
      this.setState({ searchResponsed: false });
      (async () => {
        const searchedUser = await API.searchEmail(this.state.email);
        this.setState({
          searchedUser,
          searchResponsed: true
        });
      })();
    }
    event.preventDefault();
  };

  render() {
    let msg = null;
    if (this.state.searchSubmited && this.state.emailEmpty) {
      msg = "Search text is empty!";
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
      this.state.searchResponsed &&
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
      <div id="SearchByEmail-react">
        <form onSubmit={this.onSearchSubmit}>
          <input
            type="text"
            placeholder="by email"
            value={this.state.email}
            onChange={this.onSearchChange}
          />
          <input
            disabled={!this.state.searchResponsed}
            type="submit"
            value={this.state.searchResponsed ? "Search" : "Searching ..."}
          />
        </form>
        <div>{msg && <p>{msg}</p>}</div>

        {this.state.searchedUser && (
          <CrudConnectionControlPanel
            loginUser={this.props.loginUser}
            searchedUser={this.state.searchedUser}
            searchedConnection={this.state.searchedConnection}
            updateConnectionCb={this.props.updateConnectionCb}
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
  createConnectionCb: PropTypes.func.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

function CrudConnectionControlPanel(props) {
  const {
    loginUser,
    searchedUser,
    searchedConnection,
    updateConnectionCb,
    createConnectionCb
  } = props;

  const onCreateConnection = evt => {
    createConnectionCb(searchedUser.id);
  };

  const onApproveConnection = evt => {
    updateConnectionCb(searchedConnection._id, true);
  };

  const onDenyConnection = evt => {
    updateConnectionCb(searchedConnection._id, false);
  };

  let message;
  let action;

  if (
    /*you and searchedUser haven't exchanged invitation yet*/
    searchedConnection === null
  ) {
    message = ``;
    action = (
      <button id="createConnectionBtn" onClick={onCreateConnection}>
        Invite {searchedUser.name}
      </button>
    );
  } else {
    /*you and searchedUser have exchanged invitation*/
    if (
      /*you init the connection*/
      searchedConnection.from._id === loginUser.id
    ) {
      if (
        /*but you changed your mind*/
        searchedConnection.approvedByFrom === false
      ) {
        message = `But you changed your mind.`;
        action = (
          <button id="approveConnectionByFromBtn" onClick={onApproveConnection}>
            Undo
          </button>
        );
      } else {
        /*and you havent changed your mind yet*/
        if (
          /*searchedUser haven't responsed you*/
          searchedConnection.approvedByTo === undefined
        ) {
          message = `Please wait for approval!`;
        } else if (
          /*searchedUser approved you*/
          searchedConnection.approvedByTo === true
        ) {
          message = `And you are friends!`;
        } else {
          /*searchedUser denided you*/
          message = `But sorry, you got denied!`;
        }
        action = (
          <button id="denyConnectionByFromBtn" onClick={onDenyConnection}>
            Undo invite
          </button>
        );
      }
      message = `You invited ${searchedUser.name}. ` + message;
    } else {
      /*searchedUser init the connection*/
      if (
        /*but searchedUser changed her mind*/
        searchedConnection.approvedByFrom === false
      ) {
        message = `But changed his/her mind. Sorry!`;
        action = null;
      } else {
        /*and searchedUser havent changed her mind yet*/
        if (
          /*you havent responsed searchedUser*/
          searchedConnection.approvedByTo === undefined
        ) {
          message = ``;
          action = (
            <span>
              <button
                id="approveConnectionByToFirstTimeBtn"
                onClick={onApproveConnection}
              >
                approve
              </button>
              <button
                id="denyConnectionByToFirstTimeBtn"
                onClick={onDenyConnection}
              >
                deny
              </button>
            </span>
          );
        } else if (
          /*you approved searchedUser*/
          searchedConnection.approvedByTo === true
        ) {
          message = `And you accpected!`;
          action = (
            <button
              id="denyConnectionByToSecondTimeBtn"
              onClick={onDenyConnection}
            >
              undo
            </button>
          );
        } else {
          /*you denied searchedUser*/
          message = `And you denied.`;
          action = (
            <button
              id="approveConnectionByToSecondTimeBtn"
              onClick={onApproveConnection}
            >
              undo
            </button>
          );
        }
      }
      message = `${searchedUser.name} invited you. ` + message;
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
  updateConnectionCb: PropTypes.func.isRequired,
  createConnectionCb: PropTypes.func.isRequired
};

export { SearchByEmail };
