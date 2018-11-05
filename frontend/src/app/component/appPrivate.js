import React from "react";
import PropTypes from "prop-types";

import ProfileManagementContainer from "../../bus/profile/container/profile_management.con";
import TabPanel from "../../share/style/tabPanel_style.js";
import InPostManagementContainer from "../../bus/inPost/container/inPost_management.con.js";
import AppTabEnum from "./appTabEnum.js";
import OutPostManagementContainer from "../../bus/outPost/container/outPost_management.con.js";
import ConnectionManagementContainer from "../../bus/connection/connection_management.con.js";

function PrivateAppComponent(props) {
  const { selectAppTab } = props;

  return (
    <div id="privateApp-react">
      <TabPanel show={selectAppTab === AppTabEnum.INPOST}>
        <InPostManagementContainer />
      </TabPanel>

      <TabPanel show={selectAppTab === AppTabEnum.OUTPOST}>
        <OutPostManagementContainer />
      </TabPanel>

      <TabPanel show={selectAppTab === AppTabEnum.CONNECTION}>
        <ConnectionManagementContainer />
      </TabPanel>
      <TabPanel show={selectAppTab === AppTabEnum.PROFILE}>
        <ProfileManagementContainer />
      </TabPanel>
    </div>
  );
}

PrivateAppComponent.propTypes = {
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired
};

export default PrivateAppComponent;
