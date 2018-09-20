import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import { ConnectionManagement } from "../component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "../component/OutPost/OutPostManagement.js";
import { InPostManagement } from "../component/InPost/InPostManagement.js";
import { LoadingIcon } from "../util.js";

class PrivateApp extends Component {
  state = {
    postRequestCount: null,
    friendRequestCount: null,
    unawareApproveShareCount: null,
    selectedTabIndex: null
  };
  onFriendRequestCountChange = count => {
    this.setState({ friendRequestCount: count });
  };
  onPostRequestCountChange = count => {
    this.setState({ postRequestCount: count });
  };

  onUnawareApproveShareCountChange = count => {
    this.setState({ unawareApproveShareCount: count });
  };

  render() {
    const {
      friendRequestCount,
      postRequestCount,
      unawareApproveShareCount
    } = this.state;

    const connectionNotification = _computeNotificationHtml(friendRequestCount);
    const outPostNotification = _computeNotificationHtml(postRequestCount);
    const inPostNotification = _computeNotificationHtml(
      unawareApproveShareCount
    );

    const { loginUser } = this.props;

    return (
      <div id="PrivateApp-react">
        <Tabs forceRenderTabPanel={true}>
          <div id="TabSelector-react" className="Tab-selector-list">
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
                  {connectionNotification}
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
              onPostRequestCountChange={this.onPostRequestCountChange}
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

function _computeNotificationHtml(count) {
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
}

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
