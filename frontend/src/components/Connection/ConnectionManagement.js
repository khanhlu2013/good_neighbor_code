import React, { Component } from "react";

import keys from "../../configs/keys.js";
import API from "../../api/profile-api.js";
import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionTables } from "./ConnectionTables.js";

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
      const request = await fetch(keys.API_URL("profile.connections"), {
        credentials: "include"
      });
      const connections = await request.json();
      this.setState({ connections, refreshingConnections: false });
    })();
  };

  createConnectionCb = userIdToAdd => {
    this.setState({ refreshingConnections: true });
    (async () => {
      const response = await API.createConnection(userIdToAdd);
      if (response.status === 200) {
        this.refreshConnectionsCb();
      }
    })();
  };

  modifyConnectionCb = (connectionId, isApproved) => {
    this.setState({ refreshingConnections: true });
    (async () => {
      const response = await API.modifyConnection(connectionId, isApproved);
      if (response.status === 200) {
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
          modifyConnectionCb={this.modifyConnectionCb}
        />
        <ConnectionTables
          loginUserId={this.props.loginUser._id}
          connections={this.state.connections}
          modifyConnectionCb={this.modifyConnectionCb}
        />
        <button onClick={this.uploadWidget}>Add Image</button>
        {this.state.refreshingConnections && <p>Refreshing Connection ...</p>}
      </div>
    );
  }
}

export { ConnectionManagement };
