import React from "react";

import ProfileManagementContainer from "../../bus/profile/container/profile_management.con";
import TabPanel from "../../share/style/tabPanel_style.js";
import OutPostManagementContainer from "../../bus/outPost/container/outPost_management.con.js";
import ConnectionManagementContainer from "../../bus/connection/container/connection_management.con.js";
import InPostManagementWebView from "../../bus/inPost/view/inPost_management.webView";
import InPostManagementController from "@gn/common/bus/inPost/controller/inPostManagement.controller";
import AppTabEnum from "@gn/common/app/appTabEnum";

function PrivateAppWebView(selectAppTab) {
  return (
    <div id="privateApp-react">
      <TabPanel show={selectAppTab === AppTabEnum.INPOST}>
        <InPostManagementController view={InPostManagementWebView} />
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
