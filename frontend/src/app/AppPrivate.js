import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import { ConnectionManagement } from "../component/Connection/ConnectionManagement.js";
import { OutPostManagement } from "../component/OutPost/OutPostManagement.js";
import { InPostManagement } from "../component/inPost/inPostManagement.js";
import { computeNotificationCountHtml } from "../util.js";

class PrivateApp extends Component {
  state = {
    outPostNoteCount: null,
    friendRequestCount: null,
    unawareApprovePostCount: null,
    selectedTabIndex: null
  };
  onFriendRequestCountChange = count => {
    this.setState({ friendRequestCount: count });
  };
  onOutPostNoteCountChange = count => {
    this.setState({ outPostNoteCount: count });
  };

  onUnawareApprovePostCountChange = count => {
    this.setState({ unawareApprovePostCount: count });
  };

  render() {
    const {
      friendRequestCount,
      outPostNoteCount,
      unawareApprovePostCount
    } = this.state;

    const connectionNotification = computeNotificationCountHtml(
      friendRequestCount
    );
    const outPostNotification = computeNotificationCountHtml(outPostNoteCount);
    const inPostNotification = computeNotificationCountHtml(
      unawareApprovePostCount
    );

    const { loginUser } = this.props;

    return (
      <div id="PrivateApp-react">
        <Tabs forceRenderTabPanel={true}>
          <div
            id="TabSelector-react"
            className="tab-selector-list text-center h4 font-weight-light"
          >
            <TabList>
              <Tab>
                <span id="TabSelector_InPost">
                  friend posts
                  {inPostNotification}
                </span>
              </Tab>
              <Tab>
                <span id="TabSelector_OutPost">
                  my posts
                  {outPostNotification}
                </span>
              </Tab>
              <Tab>
                <span id="TabSelector_Connection">
                  friends
                  {connectionNotification}
                </span>
              </Tab>
            </TabList>
          </div>
          <TabPanel>
            <InPostManagement
              loginUser={this.props.loginUser}
              onUnawareApprovePostCountChange={
                this.onUnawareApprovePostCountChange
              }
            />
          </TabPanel>
          <TabPanel>
            <OutPostManagement
              loginUser={loginUser}
              onOutPostNoteCountChange={this.onOutPostNoteCountChange}
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
