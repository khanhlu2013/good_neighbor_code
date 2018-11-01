import React from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user.js";
import AppTabEnum from "../appTabEnum.js";
import ProfileManagementContainer from "../../bus/profile/profile_management.container";
import { TabPanelStyle } from "../../componentUi/style/tabPanel_style.js";
import ConnectionManagement from "../../bus/connection/connectionManagement.js";
import OutPostManagement from "../../bus/outPost/outPostManagement.js";
import InPostManagementContainer from "../../bus/inPost/inPost_management.con.js";

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

export default PrivateAppComponent;
