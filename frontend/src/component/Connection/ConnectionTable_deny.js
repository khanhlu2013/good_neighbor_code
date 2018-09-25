import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../util";

const userNameColClass = "col-9";
const removeColClass = "col-3 text-center";

function Table(props) {
  const {
    connections,
    loginUserId,
    updateConnectionCb,
    updatingConnectionIds
  } = props;

  const rows = connections.map(connection => (
    <TableRow
      key={connection.id}
      connection={connection}
      isUpdatingConnection={updatingConnectionIds.includes(connection.id)}
      loginUserId={loginUserId}
      updateConnectionCb={updateConnectionCb}
    />
  ));

  return (
    <div className="container-fluid">
      <table
        id="DenyFriendTable"
        className="table table-sm table-striped table-bordered"
      >
        <thead className="thead-light">
          <tr className="d-flex">
            <th className={userNameColClass}>Denal list</th>
            <th className={removeColClass}>undo</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  connections: PropTypes.array.isRequired,
  updatingConnectionIds: PropTypes.array.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

function TableRow(props) {
  const {
    connection,
    loginUserId,
    updateConnectionCb,
    isUpdatingConnection
  } = props;
  const undoClick = () => {
    updateConnectionCb(connection.id, true);
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
            className="ConnectionTableRowApproveBtn btn btn-success"
            onClick={undoClick}
          >
            <FontAwesomeIcon icon="undo-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  connection: PropTypes.object.isRequired,
  isUpdatingConnection: PropTypes.bool.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

export { Table as ConnectionDenyTable };
