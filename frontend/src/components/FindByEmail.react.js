import React, { Component } from "react";
import validator from "validator";
import keys from "../configs/keys.js";
import API from "../api/profile-api.js";

class FindByEmail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "", //email to search
    searchedUser: null,
    searchedConnection: null, //connection is between loginUser and searchedUser
    searchSubmited: false,
    searchResponsed: true
  };

  onSearchChange = event => {
    this.setState({ email: event.currentTarget.value });
    this.setState({ searchSubmited: false });
  };

  onSearchSubmit = event => {
    this.setState({
      searchSubmited: true,
      searchedUser: null,
      searchedConnection: null
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
        const {
          user: searchedUser,
          connection: searchedConnection
        } = await response.json();
        this.setState({
          searchedUser,
          searchedConnection,
          searchResponsed: true
        });
      })();
    }
    event.preventDefault();
  };

  createConnectionCb = userIdToAdd => {
    (async () => {
      const response = await API.createConnection(userIdToAdd);
      if (response.status === 200) {
        this.props.refreshConnectionsCb();
        const newConnection = await response.json();
        this.setState({ searchedConnection: newConnection });
      }
    })();
  };

  modifyConnectionCb = (connection, isApproved) => {
    (async () => {
      const response = await API.modifyConnection(connection._id, isApproved);
      if (response.status === 200) {
        this.props.refreshConnectionsCb();
        const newConnection = await response.json();
        this.setState({ searchedConnection: newConnection });
      }
    })();
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
          modifyConnectionCb={this.modifyConnectionCb}
          createConnectionCb={this.createConnectionCb}
        />
      </div>
    );
  }
}

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
        <button onClick={onCreateInvitation}>Invite {searchedUser.name}</button>
      );
    } else {
      /*you and searchedUser have exchanged invitation*/
      if (
        /*you init the connection*/
        searchedConnection.from === loginUser._id
      ) {
        if (
          /*but you changed your mind*/
          searchedConnection.approvedByFrom === false
        ) {
          message = `But you changed your mind.`;
          action = <button onClick={onApproveInvitation}>Undo</button>;
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
          action = <button onClick={onDenyInvitation}>Undo invite</button>;
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
                <button onClick={onApproveInvitation}>approve</button>
                <button onClick={onDenyInvitation}>deny</button>
              </span>
            );
          } else if (
            /*you approved searchedUser*/
            searchedConnection.approvedByTo === true
          ) {
            message = `And you accpected!`;
            action = <button onClick={onDenyInvitation}>undo</button>;
          } else {
            /*you denied searchedUser*/
            message = `And you denied.`;
            action = <button onClick={onApproveInvitation}>undo</button>;
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

export default FindByEmail;
