import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { ConnectionManagement } from "../component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "../component/OutPost/OutPostManagement.js";
import { InPostManagement } from "../component/InPost/InPostManagement.js";
import { LoadingIcon } from "../util.js";

class PrivateApp extends Component {
  state = {
    requestOutPostCount: 0,
    requestFriendCount: 0,
    selectedTabIndex: null
  };

  onFriendRequestCountChanged = count => {
    this.setState({ requestFriendCount: count });
  };
  onRequestOutPostCountChanged = count => {
    this.setState({ requestOutPostCount: count });
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
    const { requestOutPostCount, requestFriendCount } = this.state;
    const { loginUser } = this.props;
    const myPostNotification = this._computeNotificationHtml(
      requestOutPostCount
    );
    const friendNotification = this._computeNotificationHtml(
      requestFriendCount
    );

    return (
      <div id="PrivateApp-react">
        <Tabs>
          <div className="Tab-selector-list">
            <TabList>
              <Tab>
                <span id="TabSelector_InPost">Friend Posts</span>
              </Tab>
              <Tab>
                <span id="TabSelector_OutPost">
                  My Posts
                  {myPostNotification}
                </span>
              </Tab>
              <Tab>
                <span id="TabSelector_Connection">
                  Friend
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
              loginUser={loginUser}
              requestOutPostCountChangedCb={this.onRequestOutPostCountChanged}
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
