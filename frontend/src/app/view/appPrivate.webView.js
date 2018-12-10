import React from "react";

import ProfileManagementContainer from "../../bus/profile/container/profile_management.con";
import TabPanel from "../../share/style/tabPanel_style.js";
import InPostManagementContainer from "../../bus/inPost/container/inPost_management.con.js";
import OutPostManagementContainer from "../../bus/outPost/container/outPost_management.con.js";
import ConnectionManagementContainer from "../../bus/connection/container/connection_management.con.js";
import AppTabEnum from "@gn/common/app/appTabEnum";

function PrivateAppWebView(selectAppTab) {
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
export default PrivateAppWebView;
