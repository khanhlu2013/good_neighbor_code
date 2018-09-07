import React from "react";
import PropTypes from "prop-types";

import { SearchByEmail } from "./SearchByEmail.js";
import { ConnectionTable } from "./ConnectionTable.js";

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
      connection.to.id === loginUserId && connection.approvedByTo === false
  );

  return (
    <div id="ConnectionManagement-react" className="container">
      <div className="row">
        <div className="col-sm">
          <ConnectionTable
            id="FriendTable"
            title="Friends"
            connections={friends}
            loginUserId={loginUserId}
            approveColumn={undefined}
            denyColumn="remove"
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
          {inFriends.length !== 0 && (
            <ConnectionTable
              id="InFriendTable"
              title="Friend Incomming Requests"
              connections={inFriends}
              loginUserId={loginUserId}
              approveColumn="approve"
              denyColumn="deny"
              updateConnectionCb={updateConnectionCb}
            />
          )}
          {outFriends.length !== 0 && (
            <ConnectionTable
              id="OutFriendTable"
              title="Your Outgoing Requests"
              connections={outFriends}
              loginUserId={loginUserId}
              approveColumn={undefined}
              denyColumn="undo"
              updateConnectionCb={updateConnectionCb}
            />
          )}
          {rejectedFriends.length !== 0 && (
            <ConnectionTable
              id="DenyFriendTable"
              title="Your denal of Friend Incomming Requests"
              connections={rejectedFriends}
              loginUserId={loginUserId}
              approveColumn="undo"
              denyColumn={undefined}
              updateConnectionCb={updateConnectionCb}
            />
          )}
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
