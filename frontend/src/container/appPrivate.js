import React from "react";
import PropTypes from "prop-types";

import { ConnectionManagement } from "../componentBus/connection/connectionManagement.js";
import { OutPostManagement } from "../componentBus/outPost/outPostManagement.js";
import InPostManagementContainer from "../componentBus/inPost/inPost_management.js";
import { User } from "../model/user.js";
import AppTabEnum from "../component/appTabEnum.js";
import ProfileManagementContainer from "./profile_management";
import { TabPanelStyle } from "../componentUi/style/tabPanel_style.js";
import { connect } from "react-redux";

function PrivateAppComponent(props) {
  const {
    loginUser,
    selectAppTab,
    onConnectionNotify,
    onOutPostNotify
  } = props;

  return (
    <div id="privateApp-react">
      <TabPanelStyle show={selectAppTab === AppTabEnum.INPOST}>
        <InPostManagementContainer />
      </TabPanelStyle>

      <TabPanelStyle show={selectAppTab === AppTabEnum.OUTPOST}>
        <OutPostManagement
          loginUser={loginUser}
          onOutPostNotify={onOutPostNotify}
        />
      </TabPanelStyle>

      <TabPanelStyle show={selectAppTab === AppTabEnum.CONNECTION}>
        <ConnectionManagement
          loginUser={loginUser}
          onConnectionNotify={onConnectionNotify}
        />
      </TabPanelStyle>
      <TabPanelStyle show={selectAppTab === AppTabEnum.PROFILE}>
        <ProfileManagementContainer />
      </TabPanelStyle>
    </div>
  );
}

PrivateAppComponent.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired
};
const mapStateToProps = (state, ownProps) => ({
  loginUser: state.auth.loginUser,
  selectAppTab: state.selectAppTab
});

const PrivateAppContainer = connect(mapStateToProps)(PrivateAppComponent);

export default PrivateAppContainer;

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
