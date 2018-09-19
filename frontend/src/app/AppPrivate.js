import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { ConnectionManagement } from "../component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "../component/OutPost/OutPostManagement.js";
import { InPostManagement } from "../component/InPost/InPostManagement.js";
import { LoadingIcon } from "../util.js";

class PrivateApp extends Component {
  state = {
    requestOutPostCount: null,
    requestFriendCount: null,
    unawareApprovedShareCount: null,
    selectedTabIndex: null
  };
  onFriendRequestCountChanged = count => {
    this.setState({ requestFriendCount: count });
  };
  onOutPostRequestCountChanged = count => {
    this.setState({ requestOutPostCount: count });
  };

  onUnawareApprovedShareCountChanged = count => {
    this.setState({ unawareApprovedShareCount: count });
  };

  _computeNotificationHtml = count => {
    let html = null;
    if (count !== null && count !== 0) {
      html = <span className="text-danger">{` (${count})`}</span>;
    } else if (count === null) {
      html = <LoadingIcon text={null} isAnimate={true} />;
    } else {
      if (count !== 0) throw Error("Unexpected code path");
      html = null;
    }
    return html;
  };

  render() {
    const {
      requestOutPostCount,
      requestFriendCount,
      unawareApprovedShareCount
    } = this.state;
    const { loginUser } = this.props;
    const outPostNotification = this._computeNotificationHtml(
      requestOutPostCount
    );
    const friendRequestNotification = this._computeNotificationHtml(
      requestFriendCount
    );

    const inPostNotification = this._computeNotificationHtml(
      unawareApprovedShareCount
    );
    return (
      <div id="PrivateApp-react">
        <Tabs forceRenderTabPanel={true}>
          <div className="Tab-selector-list">
            <TabList>
              <Tab>
                <span id="TabSelector_InPost">
                  Friend Posts
                  {inPostNotification}
                </span>
              </Tab>
              <Tab>
                <span id="TabSelector_OutPost">
                  My Posts
                  {outPostNotification}
                </span>
              </Tab>
              <Tab>
                <span id="TabSelector_Connection">
                  Friend
                  {friendRequestNotification}
                </span>
              </Tab>
            </TabList>
          </div>
          <TabPanel>
            <InPostManagement
              loginUser={this.props.loginUser}
              onNotifyUnawareApprovedShareCount={
                this.onUnawareApprovedShareCountChanged
              }
            />
          </TabPanel>
          <TabPanel>
            <OutPostManagement
              loginUser={loginUser}
              onNotifyOutPostRequestCount={this.onOutPostRequestCountChanged}
            />
          </TabPanel>
          <TabPanel>
            <ConnectionManagement
              loginUser={this.props.loginUser}
              onNotifyFriendRequestCount={this.onFriendRequestCountChanged}
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
