import React, { Component } from "react";
import validator from "validator";
import PropTypes from "prop-types";

import keys from "../configs/keys.js";

class FindByEmail extends Component {
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
          (connection.from._id === state.searchedUser._id &&
            connection.to._id === props.loginUser._id) ||
          (connection.from._id === props.loginUser._id &&
            connection.to._id === state.searchedUser._id)
      );
      if (lst.length > 1) {
        throw Error("Unexpected duplicate connections");
      } else if (lst.length === 1) {
        searchedConnection = lst[0];
      }
    }
    return { searchedConnection };
  }

  onSearchChange = event => {
    this.setState({ email: event.currentTarget.value });
    this.setState({ searchSubmited: false });
  };

  onSearchSubmit = event => {
    this.setState({
      searchSubmited: true,
      searchedUser: null
    });
    if (
      this.props.loginUser.email !== this.state.email &&
      validator.isEmail(this.state.email)
    ) {
      this.setState({
        searchResponsed: false
      });
      (async () => {
        const url = keys.API_URL("profile.searchEmail", {
          email: this.state.email
        });
        const response = await fetch(url, { credentials: "include" });
        const { user: searchedUser } = await response.json();
        this.setState({
          searchedUser,
          searchResponsed: true
        });
      })();
    }
    event.preventDefault();
  };

  render() {
    return (
      <div id="FindByEmail-react">
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
        <SearchResult
          loginUser={this.props.loginUser}
          email={this.state.email}
          searchSubmited={this.state.searchSubmited}
          searchResponsed={this.state.searchResponsed}
          searchedUser={this.state.searchedUser}
          searchedConnection={this.state.searchedConnection}
          modifyConnectionCb={this.props.modifyConnectionCb}
          createConnectionCb={this.props.createConnectionCb}
        />
      </div>
    );
  }
}

FindByEmail.propTypes = {
  loginUser: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  createConnectionCb: PropTypes.func.isRequired,
  modifyConnectionCb: PropTypes.func.isRequired
};

function SearchResult(props) {
  const {
    loginUser,
    email,
    searchSubmited,
    searchResponsed,
    searchedUser,
    searchedConnection,
    modifyConnectionCb,
    createConnectionCb
  } = props;

  const onCreateInvitation = evt => {
    createConnectionCb(searchedUser._id);
  };

  const onApproveInvitation = evt => {
    modifyConnectionCb(searchedConnection, true);
  };

  const onDenyInvitation = evt => {
    modifyConnectionCb(searchedConnection, false);
  };

  let message;
  let action;

  if (searchedUser) {
    if (
      /*you and searchedUser haven't exchanged invitation yet*/
      searchedConnection === null
    ) {
      message = ``;
      action = (
        <button id="createConnectionBtn" onClick={onCreateInvitation}>
          Invite {searchedUser.name}
        </button>
      );
    } else {
      /*you and searchedUser have exchanged invitation*/
      if (
        /*you init the connection*/
        searchedConnection.from._id === loginUser._id
      ) {
        if (
          /*but you changed your mind*/
          searchedConnection.approvedByFrom === false
        ) {
          message = `But you changed your mind.`;
          action = (
            <button
              id="approveConnectionByFromBtn"
              onClick={onApproveInvitation}
            >
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
            <button id="denyConnectionByFromBtn" onClick={onDenyInvitation}>
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
                  onClick={onApproveInvitation}
                >
                  approve
                </button>
                <button
                  id="denyConnectionByToFirstTimeBtn"
                  onClick={onDenyInvitation}
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
                onClick={onDenyInvitation}
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
                onClick={onApproveInvitation}
              >
                undo
              </button>
            );
          }
        }
        message = `${searchedUser.name} invited you. ` + message;
      }
    }
  }

  const emailNotEmptyAndInvalid = email && !validator.isEmail(email);
  return (
    <div id="SearchResult-react">
      {searchSubmited && !email && <p>Search text is empty!</p>}
      {searchSubmited && emailNotEmptyAndInvalid && <p>Email is invalid!</p>}
      {loginUser.email === email && <p>Can't add yourself as friend</p>}
      {!searchedUser &&
        searchSubmited &&
        searchResponsed &&
        validator.isEmail(email) &&
        loginUser.email !== email && <p>result not found</p>}

      {searchedUser && (
        <div>
          <p>
            Found {searchedUser.name}, email: {searchedUser.email}
          </p>
          <p>
            {message}
            {action}
          </p>
        </div>
      )}
    </div>
  );
}

SearchResult.propTypes = {
  loginUser: PropTypes.object.isRequired,
  email: PropTypes.string,
  searchSubmited: PropTypes.bool.isRequired,
  searchResponsed: PropTypes.bool.isRequired,
  searchedUser: PropTypes.object,
  searchedConnection: PropTypes.object,
  modifyConnectionCb: PropTypes.func.isRequired,
  createConnectionCb: PropTypes.func.isRequired
};

export default FindByEmail;
