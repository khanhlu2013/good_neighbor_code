import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingIcon from "../../../share/loadingIcon";

const removeColClass = "col-3 text-center";
const userNameColClass = "col-9";

function ConnectionOutTable(props) {
  const {
    connections,
    loginUserId,
    onUpdateConnection,
    updatingConnectionIds
  } = props;

  const rows = connections.map(connection => (
    <TableRow
      key={connection.id}
      connection={connection}
      isUpdatingConnection={updatingConnectionIds.includes(connection.id)}
      loginUserId={loginUserId}
      onUpdateConnection={onUpdateConnection}
    />
  ));

  return (
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
  );
}

ConnectionOutTable.propTypes = {
  connections: PropTypes.array.isRequired,
  updatingConnectionIds: PropTypes.array.isRequired,
  loginUserId: PropTypes.string.isRequired,
  onUpdateConnection: PropTypes.func.isRequired
};

function TableRow(props) {
  const {
    connection,
    loginUserId,
    onUpdateConnection,
    isUpdatingConnection
  } = props;

  const onRemoveClick = () => {
    onUpdateConnection(connection.id, false);
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
  onUpdateConnection: PropTypes.func.isRequired
};

export default ConnectionOutTable;
