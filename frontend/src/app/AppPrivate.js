import React, { Component } from "react";
import PropTypes from "prop-types";
import className from "classnames";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ConnectionManagement } from "../component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "../component/OutPost/OutPostManagement.js";
import { API } from "../api/profile-api.js";
import { InPostManagement } from "../component/InPost/InPostManagement.js";

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

  _computeNotificationHtml = count => {
    let html = null;
    if (count !== null && count !== 0) {
      html = <span className="text-danger">{` (${count})`}</span>;
    }
    return html;
  };

  render() {
    const { requestingOutPostCount, requestingFriendCount } = this.state;

    const myPostNotification = this._computeNotificationHtml(
      requestingOutPostCount
    );
    const friendNotification = this._computeNotificationHtml(
      requestingFriendCount
    );

    return (
      <div id="PrivateApp-react">
        <Tabs>
          <div className="Tab-list">
            <TabList>
              <Tab>Friend Posts</Tab>
              <Tab>
                <span
                  className={className({
                    isRefreshingOutPost: requestingOutPostCount === null
                  })}
                >
                  My Posts
                  {myPostNotification}
                </span>
              </Tab>
              <Tab>
                <span>
                  Friends
                  {friendNotification}
                </span>
              </Tab>
            </TabList>
          </div>
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
