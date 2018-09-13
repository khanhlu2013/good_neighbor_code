import React, { Component } from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionFriendTable } from "./ConnectionTable_friend.js";
import { ConnectionOutTable } from "./ConnectionTable_out.js";
import { ConnectionDenyTable } from "./ConnectionTable_deny.js";
import { ConnectionInTable } from "./ConnectionTable_in.js";
import { API } from "../../api/profile-api.js";

class ConnectionManagement extends Component {
  state = {
    connections: null
  };

  static calculateFriendRequestCount(connections, loginUserId) {
    if (connections === null) {
      return null;
    }
    return connections.filter(
      connection =>
        connection.to.id === loginUserId &&
        connection.approvedByFrom &&
        connection.approvedByTo === undefined
    ).length;
  }

  componentDidMount() {
    this.setConnections(null);
    this.doRefreshConnections();
  }

  doRefreshConnections = async () => {
    this.setConnections(await API.connections());
  };

  setConnections(connections) {
    this.setState({ connections });
    this.props.onFriendRequestCountChangedCb(
      ConnectionManagement.calculateFriendRequestCount(
        connections,
        this.props.loginUser.id
      )
    );
  }

  onCreateConnection = userIdToAdd => {
    this.setConnections(null);
    (async () => {
      await API.createConnection(userIdToAdd);
      this.doRefreshConnections();
    })();
  };

  onUpdateConnection = (connectionId, isApproved) => {
    this.setConnections(null);
    (async () => {
      await API.updateConnection(connectionId, isApproved);
      this.doRefreshConnections();
    })();
  };

  render() {
    let loginUserId = this.props.loginUser.id;
    let connections = this.state.connections || [];

    const friends = connections.filter(
      connection => connection.approvedByFrom && connection.approvedByTo
    );
    const inFriends = connections.filter(
      connection =>
        connection.to.id === loginUserId &&
        connection.approvedByFrom &&
        connection.approvedByTo === undefined
    );
    const outFriends = connections.filter(
      connection =>
        connection.from.id === loginUserId &&
        connection.approvedByFrom &&
        connection.approvedByTo === undefined
    );
    const rejectedFriends = connections.filter(
      connection =>
        (connection.to.id === loginUserId &&
          connection.approvedByTo === false) ||
        (connection.from.id === loginUserId &&
          connection.approvedByFrom === false)
    );

    return (
      <div
        id="ConnectionManagement-react"
        className={className({
          container: true,
          isRefreshingConnections: connections === null
        })}
      >
        <div className="row">
          <div className="col-sm">
            <ConnectionFriendTable
              connections={friends}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
            <ConnectionOutTable
              connections={outFriends}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
            <ConnectionDenyTable
              connections={rejectedFriends}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </div>
          <div className="col-sm">
            <SearchByEmail
              loginUser={this.props.loginUser}
              connections={connections}
              createConnectionCb={this.onCreateConnection}
            />
            <hr />
            <ConnectionInTable
              connections={inFriends}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </div>
        </div>
      </div>
    );
  }
}

ConnectionManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  onFriendRequestCountChangedCb: PropTypes.func.isRequired
};
export { ConnectionManagement };
