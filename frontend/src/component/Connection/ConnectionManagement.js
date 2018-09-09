import React from "react";
import PropTypes from "prop-types";

import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionFriendTable } from "./ConnectionTable_friend.js";
import { ConnectionOutTable } from "./ConnectionTable_out.js";
import { ConnectionDenyTable } from "./ConnectionTable_deny.js";
import { ConnectionInTable } from "./ConnectionTable_in.js";

function ConnectionManagement(props) {
  const {
    loginUser: { id: loginUserId },
    connections,
    updateConnectionCb
  } = props;

  const friends = connections.filter(
    connection => connection.approvedByFrom && connection.approvedByTo
  );
  const inFriends = connections.filter(
    connection =>
      connection.to.id === loginUserId &&
      connection.approvedByFrom &&
      connection.approvedByTo === undefined
  );
  const outFriends = connections.filter(
    connection =>
      connection.from.id === loginUserId &&
      connection.approvedByFrom &&
      connection.approvedByTo === undefined
  );
  const rejectedFriends = connections.filter(
    connection =>
      (connection.to.id === loginUserId && connection.approvedByTo === false) ||
      (connection.from.id === loginUserId &&
        connection.approvedByFrom === false)
  );

  return (
    <div id="ConnectionManagement-react" className="container">
      <div className="row">
        <div className="col-sm">
          <ConnectionFriendTable
            connections={friends}
            loginUserId={loginUserId}
            updateConnectionCb={updateConnectionCb}
          />
          <ConnectionOutTable
            connections={outFriends}
            loginUserId={loginUserId}
            updateConnectionCb={updateConnectionCb}
          />
          <ConnectionDenyTable
            connections={rejectedFriends}
            loginUserId={loginUserId}
            updateConnectionCb={updateConnectionCb}
          />
        </div>
        <div className="col-sm">
          <SearchByEmail
            loginUser={props.loginUser}
            connections={props.connections}
            createConnectionCb={props.createConnectionCb}
            updateConnectionCb={props.updateConnectionCb}
          />
          <hr />
          <ConnectionInTable
            connections={inFriends}
            loginUserId={loginUserId}
            updateConnectionCb={updateConnectionCb}
          />
        </div>
      </div>
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
