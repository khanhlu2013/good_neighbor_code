import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import className from "classnames";

import { ConnectionManagement } from "../component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "../component/OutPost/OutPostManagement.js";
import { API } from "../api/profile-api.js";
import { InPostManagement } from "../component/InPost/InPostManagement.js";
import { LoadingIcon } from "../util.js";

class PrivateApp extends Component {
  state = {
    requestingOutPostCount: null,
    requestingFriendCount: null
  };

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
    } else if (count === null) {
      html = <LoadingIcon text="..." />;
    } else {
      if (count !== 0) throw Error("Unexpected code path");
      html = null;
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
        <Tabs forceRenderTabPanel={false}>
          <div className="Tab-list">
            <TabList>
              <Tab>Friend Posts</Tab>
              <Tab>
                <div
                  className={className({
                    isRefreshingOutPost: requestingOutPostCount === null
                  })}
                >
                  My Posts
                  {myPostNotification}
                </div>
              </Tab>
              <Tab>
                <div id="FriendDashboard-react">
                  Friend
                  {friendNotification}
                </div>
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
