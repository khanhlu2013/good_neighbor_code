import React from "react";
import PropTypes from "prop-types";

import User from "../../model/user.js";
import ProfileManagementContainer from "../../bus/profile/container/profile_management.con";
import TabPanel from "../../share/style/tabPanel_style.js";
import ConnectionManagement from "../../bus/connection/connectionManagement.js";
import InPostManagementContainer from "../../bus/inPost/container/inPost_management.con.js";
import AppTabEnum from "./appTabEnum.js";
import OutPostManagementContainer from "../../bus/outPost/container/outPost_management.con.js";

function PrivateAppComponent(props) {
  const { loginUser, selectAppTab } = props;

  return (
    <div id="privateApp-react">
      <TabPanel show={selectAppTab === AppTabEnum.INPOST}>
        <InPostManagementContainer />
      </TabPanel>

      <TabPanel show={selectAppTab === AppTabEnum.OUTPOST}>
        <OutPostManagementContainer />
      </TabPanel>

      <TabPanel show={selectAppTab === AppTabEnum.CONNECTION}>
        <ConnectionManagement loginUser={loginUser} />
      </TabPanel>
      <TabPanel show={selectAppTab === AppTabEnum.PROFILE}>
        <ProfileManagementContainer />
      </TabPanel>
    </div>
  );
}

PrivateAppComponent.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired
};

export default PrivateAppComponent;
