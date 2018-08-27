import React, { Component } from "react";
import PropTypes from "prop-types";

import { ConnectionManagement } from "./Connection/ConnectionManagement.js";
import { PostManagement } from "./Post/PostManagement.js";
import { API_URL } from "../api/api-url.js";
import { API } from "../api/profile-api.js";

class PrivateApp extends Component {
  state = {
    connections: [],
    isRefreshingConnections: false
  };

  componentDidMount() {
    this.refreshConnections();
  }

  refreshConnections = () => {
    this.setState({ isRefreshingConnections: true });
    (async () => {
      const connections = await API.connections();
      this.setState({ connections, isRefreshingConnections: false });
    })();
  };

  createConnectionCb = userIdToAdd => {
    this.setState({ isRefreshingConnections: true });
    (async () => {
      const connection = await API.createConnection(userIdToAdd);
      if (connection) {
        this.refreshConnections();
      }
    })();
  };

  updateConnectionCb = (connectionId, isApproved) => {
    this.setState({ isRefreshingConnections: true });
    (async () => {
      const connection = await API.updateConnection(connectionId, isApproved);
      if (connection) {
        this.refreshConnections();
      }
    })();
  };

  render() {
    return (
      <div id="PrivateApp-react" className="App">
        <h1>Welcome to Good Neighboors</h1>
        <div>
          Profile: {this.props.loginUser.name} - {this.props.loginUser.email}
          <a href={API_URL("profile.logout")}>logout</a>
        </div>
        <hr />
        <ConnectionManagement
          loginUser={this.props.loginUser}
          connections={this.state.connections}
          isRefreshingConnections={this.state.isRefreshingConnections}
          createConnectionCb={this.createConnectionCb}
          updateConnectionCb={this.updateConnectionCb}
        />
        <hr />
        <PostManagement />
      </div>
    );
  }
}
PrivateApp.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { PrivateApp };
