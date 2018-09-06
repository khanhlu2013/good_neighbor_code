import React, { Component } from "react";
import PropTypes from "prop-types";

import { ConnectionManagement } from "./component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "./component/OutPost/OutPostManagement.js";
import { API_URL } from "./api/api-url.js";
import { API } from "./api/profile-api.js";
import { InPostManagement } from "./component/InPost/InPostManagement.js";

class PrivateApp extends Component {
  state = {
    connections: [],
    isRefreshingConnections: false,
    inPosts: [],
    isRefreshingInPosts: false
  };

  componentDidMount() {
    this.setState({ isRefreshingConnections: true });
    this.refreshConnections();

    this.setState({ isRefreshingInPosts: true });
    this.refreshInPosts();
  }

  refreshConnections = async () => {
    const connections = await API.connections();
    this.setState({ connections, isRefreshingConnections: false });
  };

  refreshInPosts = async () => {
    const inPosts = await API.inPosts();
    this.setState({ inPosts, isRefreshingInPosts: false });
  };

  createConnectionCb = userIdToAdd => {
    this.setState({ isRefreshingConnections: true });
    (async () => {
      await API.createConnection(userIdToAdd);
      this.refreshConnections();
    })();
  };

  updateConnectionCb = (connectionId, isApproved) => {
    this.setState({ isRefreshingConnections: true });
    (async () => {
      await API.updateConnection(connectionId, isApproved);
      this.refreshConnections();
    })();
  };

  onCreateRequestingShareCb = postID => {
    this.setState({ isRefreshingInPosts: true });
    (async () => {
      await API.createShare(postID);
      this.refreshInPosts();
    })();
  };

  onDeleteRequestingShareCb = shareID => {
    this.setState({ isRefreshingInPosts: true });
    (async () => {
      await API.deleteShare(shareID);
      this.refreshInPosts();
    })();
  };

  onReturnBorrowingShareCb = shareID => {
    console.log("Returning share", shareID);
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
        <InPostManagement
          loginUser={this.props.loginUser}
          inPosts={this.state.inPosts}
          isRefreshingInPosts={this.state.isRefreshingInPosts}
          onDeleteRequestingShareCb={this.onDeleteRequestingShareCb}
          onCreateRequestingShareCb={this.onCreateRequestingShareCb}
          onReturnBorrowingShareCb={this.onReturnBorrowingShareCb}
        />
      </div>
    );
  }
}
PrivateApp.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { PrivateApp };
