import React from "react";
import PropTypes from "prop-types";

import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionTables } from "./ConnectionTables.js";

function ConnectionManagement(props) {
  return (
    <div id="ConnectionManagement-react">
      <h1>Friend Management</h1>
      <SearchByEmail
        loginUser={props.loginUser}
        connections={props.connections}
        createConnectionCb={props.createConnectionCb}
        updateConnectionCb={props.updateConnectionCb}
      />
      <ConnectionTables
        loginUserId={props.loginUser.id}
        connections={props.connections}
        updateConnectionCb={props.updateConnectionCb}
      />
      <button>Add Image</button>
      {props.isRefreshingConnections && <p>Refreshing Connection ...</p>}
    </div>
  );
}
ConnectionManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  isRefreshingConnections: PropTypes.bool.isRequired,
  createConnectionCb: PropTypes.func.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};
export { ConnectionManagement };

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
