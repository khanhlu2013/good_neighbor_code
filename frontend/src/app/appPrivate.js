import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import { ConnectionManagement } from "../component/connection/connectionManagement.js";
import { OutPostManagement } from "../component/outPost/outPostManagement.js";
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
      <div id="privateApp-react">
        <Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab>
              <span id="tabSelector_inPost">
                friend posts
                {inPostNotification}
              </span>
            </Tab>
            <Tab>
              <span id="tabSelector_outPost">
                my posts
                {outPostNotification}
              </span>
            </Tab>
            <Tab>
              <span id="tabSelector_connection">
                friends
                {connectionNotification}
              </span>
            </Tab>
          </TabList>
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
