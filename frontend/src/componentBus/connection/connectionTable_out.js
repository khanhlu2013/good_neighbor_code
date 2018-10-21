import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../componentUi/loadingIcon";

const removeColClass = "col-3 text-center";
const userNameColClass = "col-9";

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
        id="OutFriendTable"
        className="table table-sm table-striped table-bordered"
      >
        <thead className="thead-light">
          <tr className="d-flex">
            <th className={userNameColClass}>Waiting for friend response</th>
            <th className={removeColClass}>remove</th>
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

  const onRemoveClick = () => {
    updateConnectionCb(connection.id, false);
  };

  return (
    <tr className="ConnectionTableRow d-flex">
      <td className={userNameColClass}>
        {connection.getTheOtherUser(loginUserId).getNameAndEmail()}
      </td>
      <td className={removeColClass}>
        {isUpdatingConnection ? (
          <LoadingIcon text={null} />
        ) : (
          <button
            className="ConnectionTableRowDenyBtn btn btn-warning"
            onClick={onRemoveClick}
          >
            <FontAwesomeIcon icon="trash-alt" />
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

export { Table as ConnectionOutTable };
