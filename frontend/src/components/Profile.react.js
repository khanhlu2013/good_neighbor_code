import React, { Component } from "react";
import FindByEmail from "./FindByEmail.react.js";
import ConnectionTable from "./ConnectionTable.react.js";
import keys from "../configs/keys.js";

class Profile extends Component {
  state = {
    connections: []
  };

  static getDerivedStateFromProps(props, state) {
    const loginUserId = props.loginUser._id;

    const friends = state.connections.filter(
      connection => connection.approvedByFrom && connection.approvedByTo
    );
    const inFriends = state.connections.filter(
      connection =>
        connection.to._id === loginUserId &&
        connection.approvedByFrom &&
        connection.approvedByTo === undefined
    );
    const outFriends = state.connections.filter(
      connection =>
        connection.from._id === loginUserId &&
        connection.approvedByFrom &&
        connection.approvedByTo === undefined
    );
    const rejectedFriends = state.connections.filter(
      connection =>
        connection.to._id === loginUserId && connection.approvedByTo === false
    );
    return { friends, inFriends, outFriends, rejectedFriends };
  }

  refreshConnectionsCb = () => {
    (async () => {
      const request = await fetch(keys.API_URL("profile.connections"), {
        credentials: "include"
      });
      const connections = await request.json();
      this.setState({ connections });
    })();
  };

  componentDidMount() {
    this.refreshConnectionsCb();
  }

  render() {
    const loginUserId = this.props.loginUser._id;
    return (
      <div id="Profile-react">
        <div>
          Profile: {this.props.loginUser.name} - {this.props.loginUser.email}
          <a href={keys.API_URL("profile.logout")}>logout</a>
        </div>
        <FindByEmail
          refreshConnectionsCb={this.refreshConnectionsCb}
          loginUser={this.props.loginUser}
        />
        <ConnectionTable
          title="Friends"
          connections={this.state.friends}
          loginUserId={loginUserId}
          approveColumn={undefined}
          denyColumn="remove"
          refreshConnectionsCb={this.refreshConnectionsCb}
        />
        <ConnectionTable
          title="Incomming invite"
          connections={this.state.inFriends}
          loginUserId={loginUserId}
          approveColumn="approve"
          denyColumn="deny"
          refreshConnectionsCb={this.refreshConnectionsCb}
        />
        <ConnectionTable
          title="Outgoing invite"
          connections={this.state.outFriends}
          loginUserId={loginUserId}
          approveColumn={undefined}
          denyColumn="undo"
          refreshConnectionsCb={this.refreshConnectionsCb}
        />
        <ConnectionTable
          title="Denied invite"
          connections={this.state.rejectedFriends}
          loginUserId={loginUserId}
          approveColumn="undo"
          denyColumn={undefined}
          refreshConnectionsCb={this.refreshConnectionsCb}
        />
      </div>
    );
  }
}

export default Profile;
