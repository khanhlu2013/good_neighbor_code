import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { ConnectionManagement } from "../component/connection/connectionManagement.js";
import { OutPostManagement } from "../component/outPost/outPostManagement.js";
import { InPostManagement } from "../component/inPost/inPost_management.js";
import { User } from "../model/user.js";
import { AppTabEnum } from "./appTabEnum.js";
import { ProfileManagement } from "../component/profile_management";

function PrivateApp(props) {
  const {
    loginUser,
    selectTab,
    onConnectionNotify,
    onInPostNotify,
    onOutPostNotify,
    onUserDidLogOut
  } = props;

  return (
    <div id="privateApp-react">
      <div
        className={className({
          "tab-panel": true,
          "tab-panel-hide": selectTab !== AppTabEnum.INPOST
        })}
      >
        <InPostManagement
          loginUser={loginUser}
          onInPostNotify={onInPostNotify}
        />
      </div>

      <div
        className={className({
          "tab-panel": true,
          "tab-panel-hide": selectTab !== AppTabEnum.OUTPOST
        })}
      >
        <OutPostManagement
          loginUser={loginUser}
          onOutPostNotify={onOutPostNotify}
        />
      </div>
      <div
        className={className({
          "tab-panel": true,
          "tab-panel-hide": selectTab !== AppTabEnum.CONNECTION
        })}
      >
        <ConnectionManagement
          loginUser={loginUser}
          onConnectionNotify={onConnectionNotify}
        />
      </div>
      <div
        className={className({
          "tab-panel": true,
          "tab-panel-hide": selectTab !== AppTabEnum.PROFILE
        })}
      >
        <ProfileManagement
          loginUser={loginUser}
          onUserDidLogOut={onUserDidLogOut}
        />
      </div>
    </div>
  );
}

PrivateApp.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  onConnectionNotify: PropTypes.func.isRequired,
  onInPostNotify: PropTypes.func.isRequired,
  onOutPostNotify: PropTypes.func.isRequired,
  onUserDidLogOut: PropTypes.func.isRequired
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
