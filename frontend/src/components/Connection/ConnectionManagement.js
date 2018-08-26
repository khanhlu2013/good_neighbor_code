import React, { Component } from "react";

import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionTables } from "./ConnectionTables.js";
import { API } from "../../api/profile-api.js";

class ConnectionManagement extends Component {
  state = {
    connections: [],
    refreshingConnections: false
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "goodneighboors",
        upload_preset: "postimage",
        public_id: "abcd1234"
      },
      function(error, result) {
        console.log(result);
      }
    );
  };
  refreshConnectionsCb = () => {
    this.setState({ refreshingConnections: true });
    (async () => {
      const connections = await API.connections();
      this.setState({ connections, refreshingConnections: false });
    })();
  };

  createConnectionCb = userIdToAdd => {
    this.setState({ refreshingConnections: true });
    (async () => {
      const connection = await API.createConnection(userIdToAdd);
      if (connection) {
        this.refreshConnectionsCb();
      }
    })();
  };

  updateConnectionCb = (connectionId, isApproved) => {
    this.setState({ refreshingConnections: true });
    (async () => {
      const connection = await API.updateConnection(connectionId, isApproved);
      if (connection) {
        this.refreshConnectionsCb();
      }
    })();
  };

  componentDidMount() {
    this.refreshConnectionsCb();
  }

  render() {
    return (
      <div id="ConnectionManagement-react">
        <h1>Friend Management</h1>
        <SearchByEmail
          refreshConnectionsCb={this.refreshConnectionsCb}
          loginUser={this.props.loginUser}
          connections={this.state.connections}
          refreshingConnections={this.state.refreshingConnections}
          createConnectionCb={this.createConnectionCb}
          updateConnectionCb={this.updateConnectionCb}
        />
        <ConnectionTables
          loginUserId={this.props.loginUser._id}
          connections={this.state.connections}
          updateConnectionCb={this.updateConnectionCb}
        />
        <button onClick={this.uploadWidget}>Add Image</button>
        {this.state.refreshingConnections && <p>Refreshing Connection ...</p>}
      </div>
    );
  }
}

export { ConnectionManagement };
