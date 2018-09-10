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
    requestingOutPostCount: null,
    requestingFriendCount: null
  };

  componentDidMount() {
    (async () => {
      const outPosts = await API.outPosts();
      this.onRequestingOutPostCountChanged(
        OutPostManagement.calculateRequestingPostCount(outPosts)
      );
    })();

    (async () => {
      const connections = await API.connections();
      this.onFriendRequestCountChanged(
        ConnectionManagement.calculateFriendRequestCount(
          connections,
          this.props.loginUser.id
        )
      );
    })();
  }

  onFriendRequestCountChanged = count => {
    this.setState({ requestingFriendCount: count });
  };
  onRequestingOutPostCountChanged = count => {
    this.setState({ requestingOutPostCount: count });
  };

  render() {
    const { requestingOutPostCount, requestingFriendCount } = this.state;

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
            <Tab>Friend Posts</Tab>
            <Tab>
              My Posts
              {Boolean(requestingOutPostCount) && (
                <span className="text-danger">{` (${requestingOutPostCount})`}</span>
              )}
            </Tab>
            <Tab>
              Friends
              {Boolean(requestingFriendCount) && (
                <span className="text-danger">{` (${requestingFriendCount})`}</span>
              )}
            </Tab>
          </TabList>
          <TabPanel>
            <InPostManagement loginUser={this.props.loginUser} />
          </TabPanel>
          <TabPanel>
            <OutPostManagement
              requestingOutPostCountChangedCb={
                this.onRequestingOutPostCountChanged
              }
            />
          </TabPanel>
          <TabPanel>
            <ConnectionManagement
              loginUser={this.props.loginUser}
              onFriendRequestCountChangedCb={this.onFriendRequestCountChanged}
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

// uploadWidget = () => {
//   window.cloudinary.openUploadWidget(
//     {
//       cloud_name: "goodneighboors",
//       upload_preset: "postimage",
//       public_id: "abcd1234"
//     },
//     function(error, result) {
//       console.log(result);
//     }
//   );
// };
