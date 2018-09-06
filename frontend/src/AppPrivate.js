import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    const inPostsFilterDeny = inPosts.filter(inPost =>
      inPost.denied.every(
        share => share.borrower.id !== this.props.loginUser.id
      )
    );

    this.setState({ inPosts: inPostsFilterDeny, isRefreshingInPosts: false });
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
    const [post] = this.state.inPosts.filter(
      post => post.shares.filter(share => share.id === shareID).length === 1
    );
    if (
      window.confirm(`You are returning ${post.title}. This can not be undo!`)
    ) {
      this.setState({ isRefreshingInPosts: true });
      (async () => {
        const isReturnedByTo = true;
        await API.updateInShare(shareID, isReturnedByTo);
        this.refreshInPosts();
      })();
    }
  };

  render() {
    return (
      <div id="PrivateApp-react" className="App">
        <div className="App-header">
          <h1>Welcome to Good Neighboors</h1>
          <h3>
            {this.props.loginUser.name} - {this.props.loginUser.email}
            <a href={API_URL("profile.logout")}>logout</a>
          </h3>
        </div>
        <Tabs>
          <TabList>
            <Tab>Friends</Tab>
            <Tab>My Posts</Tab>
            <Tab>Friend Posts</Tab>
          </TabList>

          <TabPanel>
            <ConnectionManagement
              loginUser={this.props.loginUser}
              connections={this.state.connections}
              isRefreshingConnections={this.state.isRefreshingConnections}
              createConnectionCb={this.createConnectionCb}
              updateConnectionCb={this.updateConnectionCb}
            />
          </TabPanel>
          <TabPanel>
            <OutPostManagement />
          </TabPanel>
          <TabPanel>
            <InPostManagement
              loginUser={this.props.loginUser}
              inPosts={this.state.inPosts}
              isRefreshingInPosts={this.state.isRefreshingInPosts}
              onDeleteRequestingShareCb={this.onDeleteRequestingShareCb}
              onCreateRequestingShareCb={this.onCreateRequestingShareCb}
              onReturnBorrowingShareCb={this.onReturnBorrowingShareCb}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
PrivateApp.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { PrivateApp };
