import React, { Component } from "react";
import PropTypes from "prop-types";

import { SearchByEmail } from "./searchByEmail.js";
import { ConnectionFriendTable } from "./connectionTable_friend.js";
import { ConnectionOutTable } from "./connectionTable_out.js";
import { ConnectionDenyTable } from "./connectionTable_deny.js";
import { ConnectionInTable } from "./connectionTable_in.js";
import { API } from "../../api/profile-api.js";
import { LoadingIcon } from "../../util.js";

class ConnectionManagement extends Component {
  state = {
    connections: null,
    isCreatingConnection: false,
    updatingConnectionIds: []
  };

  static countFriendRequest(connections, loginUserId) {
    if (connections === null) {
      return null;
    }
    return connections.filter(
      connection =>
        connection.to.id === loginUserId &&
        connection.isApproveByFrom &&
        connection.isApproveByTo === undefined
    ).length;
  }

  componentDidMount() {
    this.props.onFriendRequestCountChange(null);

    (async () => {
      const connections = await API.connections();
      this.setConnectionsAndNotifyRequestCount(connections);
    })();
  }

  setConnectionsAndNotifyRequestCount(connections) {
    this.setState({ connections });
    this.props.onFriendRequestCountChange(
      ConnectionManagement.countFriendRequest(
        connections,
        this.props.loginUser.id
      )
    );
  }

  onCreateConnection = userIdToAdd => {
    this.props.onFriendRequestCountChange(null);
    this.setState({ isCreatingConnection: true });
    (async () => {
      const newConnection = await API.createConnection(userIdToAdd);
      this.setConnectionsAndNotifyRequestCount([
        ...this.state.connections,
        newConnection
      ]);
      this.setState({ isCreatingConnection: false });
    })();
  };

  onUpdateConnection = (connectionId, isApproved) => {
    this.props.onFriendRequestCountChange(null);
    this.setState({
      updatingConnectionIds: [...this.state.updatingConnectionIds, connectionId]
    });
    (async () => {
      const {
        updatedApprovedByTo,
        updatedApprovedByFrom
      } = await API.updateConnection(connectionId, isApproved);

      const curConnection = this.state.connections.find(
        connection => connection.id === connectionId
      );
      curConnection.isApproveByFrom = updatedApprovedByFrom;
      curConnection.isApproveByTo = updatedApprovedByTo;
      this.setConnectionsAndNotifyRequestCount([
        ...this.state.connections.filter(
          connection => connection.id !== curConnection.id
        ),
        curConnection
      ]);

      this.setState({
        updatingConnectionIds: this.state.updatingConnectionIds.filter(
          id => id !== connectionId
        )
      });
    })();
  };

  render() {
    let loginUserId = this.props.loginUser.id;
    let { connections, updatingConnectionIds } = this.state;

    let htmlContent;

    if (connections !== null) {
      const friends = connections.filter(
        connection => connection.isApproveByFrom && connection.isApproveByTo
      );
      const inFriends = connections.filter(
        connection =>
          connection.to.id === loginUserId &&
          connection.isApproveByFrom &&
          connection.isApproveByTo === undefined
      );
      const outFriends = connections.filter(
        connection =>
          connection.from.id === loginUserId &&
          connection.isApproveByFrom &&
          connection.isApproveByTo === undefined
      );
      const rejectedFriends = connections.filter(
        connection =>
          (connection.to.id === loginUserId &&
            connection.isApproveByTo === false) ||
          (connection.from.id === loginUserId &&
            connection.isApproveByFrom === false)
      );

      htmlContent = (
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <ConnectionFriendTable
                connections={friends}
                updatingConnectionIds={updatingConnectionIds}
                loginUserId={loginUserId}
                updateConnectionCb={this.onUpdateConnection}
              />
              <ConnectionOutTable
                connections={outFriends}
                updatingConnectionIds={updatingConnectionIds}
                loginUserId={loginUserId}
                updateConnectionCb={this.onUpdateConnection}
              />
              <ConnectionDenyTable
                connections={rejectedFriends}
                updatingConnectionIds={updatingConnectionIds}
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
                updatingConnectionIds={updatingConnectionIds}
                loginUserId={loginUserId}
                updateConnectionCb={this.onUpdateConnection}
              />
            </div>
          </div>
        </div>
      );
    } else {
      htmlContent = (
        <h1 className="text-center">
          <LoadingIcon text="loading" isAnimate={true} />
        </h1>
      );
    }

    return (
      <div id="ConnectionManagement-react" className="bg-white">
        {htmlContent}
      </div>
    );
  }
}

ConnectionManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  onFriendRequestCountChange: PropTypes.func.isRequired
};
export { ConnectionManagement };
