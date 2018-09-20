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
    unawareApproveShareCount: null,
    selectedTabIndex: null
  };
  onFriendRequestCountChange = count => {
    this.setState({ requestFriendCount: count });
  };
  onOutPostRequestCountChange = count => {
    this.setState({ requestOutPostCount: count });
  };

  onUnawareApproveShareCountChange = count => {
    this.setState({ unawareApproveShareCount: count });
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
      unawareApproveShareCount
    } = this.state;
    const { loginUser } = this.props;
    const outPostNotification = this._computeNotificationHtml(
      requestOutPostCount
    );
    const friendRequestNotification = this._computeNotificationHtml(
      requestFriendCount
    );

    const inPostNotification = this._computeNotificationHtml(
      unawareApproveShareCount
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
              onUnawareApproveShareCountChange={
                this.onUnawareApproveShareCountChange
              }
            />
          </TabPanel>
          <TabPanel>
            <OutPostManagement
              loginUser={loginUser}
              onOutPostRequestCountChange={this.onOutPostRequestCountChange}
            />
          </TabPanel>
          <TabPanel>
            <ConnectionManagement
              loginUser={this.props.loginUser}
              onFriendRequestCountChange={this.onFriendRequestCountChange}
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
