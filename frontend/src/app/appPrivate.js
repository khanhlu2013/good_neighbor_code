import React from "react";
import PropTypes from "prop-types";

import { ConnectionManagement } from "../componentBus/connection/connectionManagement.js";
import { OutPostManagement } from "../componentBus/outPost/outPostManagement.js";
import { InPostManagement } from "../componentBus/inPost/inPost_management.js";
import { User } from "../model/user.js";
import { AppTabEnum } from "./appTabEnum.js";
import ProfileManagementContainer from "../container/profile_management";
import { TabPanelStyle } from "../componentUi/style/tabPanel_style.js";

function PrivateApp(props) {
  const {
    loginUser,
    selectTab,
    onConnectionNotify,
    onInPostNotify,
    onOutPostNotify
  } = props;

  return (
    <div id="privateApp-react">
      <TabPanelStyle show={selectTab === AppTabEnum.INPOST}>
        <InPostManagement
          loginUser={loginUser}
          onInPostNotify={onInPostNotify}
        />
      </TabPanelStyle>

      <TabPanelStyle show={selectTab === AppTabEnum.OUTPOST}>
        <OutPostManagement
          loginUser={loginUser}
          onOutPostNotify={onOutPostNotify}
        />
      </TabPanelStyle>

      <TabPanelStyle show={selectTab === AppTabEnum.CONNECTION}>
        <ConnectionManagement
          loginUser={loginUser}
          onConnectionNotify={onConnectionNotify}
        />
      </TabPanelStyle>
      <TabPanelStyle show={selectTab === AppTabEnum.PROFILE}>
        <ProfileManagementContainer />
      </TabPanelStyle>
    </div>
  );
}

PrivateApp.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  onConnectionNotify: PropTypes.func.isRequired,
  onInPostNotify: PropTypes.func.isRequired,
  onOutPostNotify: PropTypes.func.isRequired
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
