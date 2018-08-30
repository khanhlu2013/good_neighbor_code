import React, { Component } from "react";
import PropTypes from "prop-types";

import { ConnectionManagement } from "./Connection/ConnectionManagement.js";
import { OutPostManagement } from "./Post/OutPostManagement.js";
import { API_URL } from "../api/api-url.js";
import { API } from "../api/profile-api.js";
import { InPostTable } from "./InPost/InPostTable.js";

class PrivateApp extends Component {
  state = {
    connections: [],
    isRefreshingConnections: false,
    inPosts: [],
    isRefreshingInPosts: false
  };

  componentDidMount() {
    this.refreshConnections();
    this.refreshInPosts();
  }

  refreshConnections = () => {
    this.setState({ isRefreshingConnections: true });
    (async () => {
      const connections = await API.connections();
      this.setState({ connections, isRefreshingConnections: false });
    })();
  };

  refreshInPosts = () => {
    this.setState({ isRefreshingInPosts: true });
    (async () => {
      const inPosts = await API.inPosts();
      this.setState({ inPosts, isRefreshingInPosts: false });
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
        <OutPostManagement />
        <hr />
        <InPostTable inPosts={this.state.inPosts} />
      </div>
    );
  }
}
PrivateApp.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { PrivateApp };
