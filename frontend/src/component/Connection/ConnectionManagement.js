import React, { Component } from "react";
import PropTypes from "prop-types";

import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionFriendTable } from "./ConnectionTable_friend.js";
import { ConnectionOutTable } from "./ConnectionTable_out.js";
import { ConnectionDenyTable } from "./ConnectionTable_deny.js";
import { ConnectionInTable } from "./ConnectionTable_in.js";
import { API } from "../../api/profile-api.js";
import { LoadingIcon } from "../../util.js";

class ConnectionManagement extends Component {
  state = {
    connections: null,
    isCreatingConnection: false,
    connectionIdCurrentlyUpdating: null
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
    this.props.onFriendRequestCountChangedCb(null);

    (async () => {
      const connections = await API.connections();
      this.setConnectionsAndNotifyRequestingCount(connections);
    })();
  }

  doRefreshConnections = async () => {
    this.setConnectionsAndNotifyRequestingCount(await API.connections());
  };

  setConnectionsAndNotifyRequestingCount(connections) {
    this.setState({ connections });
    this.props.onFriendRequestCountChangedCb(
      ConnectionManagement.calculateFriendRequestCount(
        connections,
        this.props.loginUser.id
      )
    );
  }

  onCreateConnection = userIdToAdd => {
    this.props.onFriendRequestCountChangedCb(null);
    this.setState({ isCreatingConnection: true });
    (async () => {
      await API.createConnection(userIdToAdd);
      await this.doRefreshConnections();
      this.setState({ isCreatingConnection: false });
    })();
  };

  onUpdateConnection = (connectionId, isApproved) => {
    this.props.onFriendRequestCountChangedCb(null);
    this.setState({ connectionIdCurrentlyUpdating: connectionId });
    (async () => {
      await API.updateConnection(connectionId, isApproved);
      await this.doRefreshConnections();
      this.setState({ connectionIdCurrentlyUpdating: null });
    })();
  };

  render() {
    let loginUserId = this.props.loginUser.id;
    let { connections, connectionIdCurrentlyUpdating } = this.state;

    let htmlContent;

    if (connections !== null) {
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

      htmlContent = (
        <div className="row">
          <div className="col-sm">
            <ConnectionFriendTable
              connections={friends}
              connectionIdCurrentlyUpdating={connectionIdCurrentlyUpdating}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
            <ConnectionOutTable
              connections={outFriends}
              connectionIdCurrentlyUpdating={connectionIdCurrentlyUpdating}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
            <ConnectionDenyTable
              connections={rejectedFriends}
              connectionIdCurrentlyUpdating={connectionIdCurrentlyUpdating}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </div>
          <div className="col-sm">
            <SearchByEmail
              loginUser={this.props.loginUser}
              connections={connections}
              createConnectionCb={this.onCreateConnection}
              isCreatingConnection={this.state.isCreatingConnection}
            />
            <hr />
            <ConnectionInTable
              connections={inFriends}
              connectionIdCurrentlyUpdating={connectionIdCurrentlyUpdating}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </div>
        </div>
      );
    } else {
      htmlContent = (
        <h1 className="text-center">
          <LoadingIcon text="please wait" isAnimate={true} />
        </h1>
      );
    }

    return (
      <div id="ConnectionManagement-react" className="container">
        {htmlContent}
      </div>
    );
  }
}

ConnectionManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  onFriendRequestCountChangedCb: PropTypes.func.isRequired
};
export { ConnectionManagement };
