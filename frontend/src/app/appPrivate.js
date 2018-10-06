import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { ConnectionManagement } from "../component/connection/connectionManagement.js";
import { OutPostManagement } from "../component/outPost/outPostManagement.js";
import { InPostManagement } from "../component/inPost/inPostManagement.js";
import { User } from "../model/user.js";

function PrivateApp(props) {
  const {
    loginUser,
    isInOutCon1BaseIndexTabVisible,
    onConnectionNotify,
    onInPostNotify,
    onOutPostNotify
  } = props;

  return (
    <div id="privateApp-react">
      <div
        className={className({
          "tab-pannel-hide": isInOutCon1BaseIndexTabVisible !== 1
        })}
      >
        <InPostManagement
          loginUser={loginUser}
          onInPostNotify={onInPostNotify}
        />
      </div>

      <div
        className={className({
          "tab-pannel-hide": isInOutCon1BaseIndexTabVisible !== 2
        })}
      >
        <OutPostManagement
          loginUser={loginUser}
          onOutPostNotify={onOutPostNotify}
        />
      </div>
      <div
        className={className({
          "tab-pannel-hide": isInOutCon1BaseIndexTabVisible !== 3
        })}
      >
        <ConnectionManagement
          loginUser={loginUser}
          onConnectionNotify={onConnectionNotify}
        />
      </div>
    </div>
  );
}

PrivateApp.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  isInOutCon1BaseIndexTabVisible: PropTypes.number.isRequired,
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
