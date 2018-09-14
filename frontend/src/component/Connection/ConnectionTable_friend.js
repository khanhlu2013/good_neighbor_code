import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nullOrRequiredValidator, LoadingIcon } from "../../util";

const userNameColClass = "col-9";
const removeColClass = "col-3 text-center";

function ConnectionFriendTable(props) {
  const {
    connections,
    loginUserId,
    updateConnectionCb,
    connectionIdCurrentlyUpdating
  } = props;

  const friendCount = connections.length;
  const rows = connections.map(connection => (
    <ConnectionRow
      key={connection.id}
      connection={connection}
      isUpdatingConnection={connection.id === connectionIdCurrentlyUpdating}
      loginUserId={loginUserId}
      updateConnectionCb={updateConnectionCb}
    />
  ));

  return (
    <div className="container-fluid">
      <table id="FriendTable" className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr className="d-flex">
            <th className={userNameColClass}>{`Friends: ${friendCount}`}</th>
            <th className={removeColClass}>remove</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

ConnectionFriendTable.propTypes = {
  connections: PropTypes.array.isRequired,
  connectionIdCurrentlyUpdating: nullOrRequiredValidator("string"),
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

function ConnectionRow(props) {
  const {
    connection,
    loginUserId,
    updateConnectionCb,
    isUpdatingConnection
  } = props;
  const denyClick = () => {
    updateConnectionCb(connection.id, false);
  };

  return (
    <tr className="ConnectionTableRow d-flex">
      <td className={userNameColClass}>
        {connection.getTheOtherUser(loginUserId).name}
      </td>
      <td className={removeColClass}>
        {isUpdatingConnection ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="ConnectionTableRowDenyBtn btn btn-warning"
            onClick={denyClick}
          >
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}

ConnectionRow.propTypes = {
  connection: PropTypes.object.isRequired,
  isUpdatingConnection: PropTypes.bool.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

export { ConnectionFriendTable };
