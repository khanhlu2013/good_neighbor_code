import React, { Component } from "react";
import validator from "validator";
import keys from "../configs/keys.js";

class FindByEmail extends Component {
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

  onCreateInvitationCb = invitingUser => {
    (async () => {
      const body = JSON.stringify({ userIdToAdd: invitingUser._id });
      const response = await fetch(keys.API_URL("profile.createInvitation"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body,
        credentials: "include"
      });
      if (response.status === 200) {
        this.props.onConnectionsChangeCb();
        const newConnection = await response.json();
        this.setState({ searchedConnection: newConnection });
      }
    })();
  };

  onModifyInvitationCb = (connection, isApproved) => {
    (async () => {
      const body = JSON.stringify({ connectionId: connection._id, isApproved });
      const response = await fetch(keys.API_URL("profile.modifyInvitation"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body,
        credentials: "include"
      });
      if (response.status === 200) {
        this.props.onConnectionsChangeCb();
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
          onModifyInvitationCb={this.onModifyInvitationCb}
          onCreateInvitationCb={this.onCreateInvitationCb}
        />
      </div>
    );
  }
}

function SearchResult(props) {
  const onCreateInvitation = evt => {
    props.onCreateInvitationCb(props.searchedUser);
  };

  const onApproveInvitation = evt => {
    props.onModifyInvitationCb(props.searchedConnection, true);
  };

  const onDenyInvitation = evt => {
    props.onModifyInvitationCb(props.searchedConnection, false);
  };

  let message;
  let action;

  if (props.searchedUser) {
    if (
      /*you and searchedUser haven't exchanged invitation yet*/ props.searchedConnection ===
      null
    ) {
      message = ``;
      action = (
        <button onClick={onCreateInvitation}>
          Invite {props.searchedUser.name}
        </button>
      );
    } /*you and searchedUser have exchanged invitation*/ else {
      if (
        /*you init the connection*/ props.searchedConnection.from ===
        props.loginUser._id
      ) {
        if (
          /*but you changed your mind*/ props.searchedConnection
            .approvedByFrom === false
        ) {
          message = `But you changed your mind.`;
          action = <button onClick={onApproveInvitation}>Undo</button>;
        } /*and you havent changed your mind yet*/ else {
          if (
            /*searchedUser haven't responsed you*/ props.searchedConnection
              .approvedByTo === undefined
          ) {
            message = `Please wait for approval!`;
          } else if (
            /*searchedUser approved you*/ props.searchedConnection
              .approvedByTo === true
          ) {
            message = `And you are friends!`;
          } /*searchedUser denided you*/ else {
            message = `But sorry, you got denied!`;
          }
          action = <button onClick={onDenyInvitation}>Undo invite</button>;
        }
        message = `You invited ${props.searchedUser.name}. ` + message;
      } /*searchedUser init the connection*/ else {
        if (
          /*but searchedUser changed her mind*/ props.searchedConnection
            .approvedByFrom === false
        ) {
          message = `But changed his/her mind. Sorry!`;
          action = null;
        } /*and searchedUser havent changed her mind yet*/ else {
          if (
            /*you havent responsed searchedUser*/ props.searchedConnection
              .approvedByTo === undefined
          ) {
            message = ``;
            action = (
              <span>
                <button onClick={onApproveInvitation}>approve</button>
                <button onClick={onDenyInvitation}>deny</button>
              </span>
            );
          } else if (
            /*you approved searchedUser*/ props.searchedConnection
              .approvedByTo === true
          ) {
            message = `And you accpected!`;
            action = <button onClick={onDenyInvitation}>undo</button>;
          } /*you denied searchedUser*/ else {
            message = `And you denied.`;
            action = <button onClick={onApproveInvitation}>undo</button>;
          }
        }
        message = `${props.searchedUser.name} invited you. ` + message;
      }
    }
  }

  const emailNotEmptyAndInvalid =
    props.email && !validator.isEmail(props.email);
  return (
    <div id="SearchResult-react">
      {props.searchSubmited && !props.email && <p>Search text is empty!</p>}
      {props.searchSubmited &&
        emailNotEmptyAndInvalid && <p>Email is invalid!</p>}
      {props.loginUser.email === props.email && (
        <p>Can't add yourself as friend</p>
      )}
      {!props.searchedUser &&
        props.searchSubmited &&
        props.searchResponsed &&
        validator.isEmail(props.email) &&
        props.loginUser.email !== props.email && <p>result not found</p>}

      {props.searchedUser && (
        <div>
          <p>
            Found {props.searchedUser.name}, email: {props.searchedUser.email}
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
