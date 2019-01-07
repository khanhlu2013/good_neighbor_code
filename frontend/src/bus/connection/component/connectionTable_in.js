import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingIcon from "../../../share/loadingIcon";

const userNameColClass = "col-8";
const decideColClass = "col-2 text-center";

function ConnectionInTable(props) {
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
      id="InFriendTable"
      className="table table-sm table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr className="d-flex">
          <th className={userNameColClass}>Friend requests</th>
          <th className={decideColClass}>
            <FontAwesomeIcon icon="thumbs-up" />
          </th>
          <th className={decideColClass}>
            <FontAwesomeIcon icon="thumbs-down" />
          </th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}

ConnectionInTable.propTypes = {
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

  const approveClick = () => {
    onUpdateConnection(connection.id, true);
  };
  const denyClick = () => {
    onUpdateConnection(connection.id, false);
  };

  return (
    <tr className="ConnectionTableRow d-flex">
      <td className="col-8">
        {connection.getTheOtherUser(loginUserId).getNameAndEmail()}
      </td>

      <td className={decideColClass}>
        {isUpdatingConnection ? (
          <LoadingIcon text={null} />
        ) : (
          <button
            className="ConnectionTableRowApproveBtn btn btn-success"
            onClick={approveClick}
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
        )}
      </td>
      <td className={decideColClass}>
        {isUpdatingConnection ? (
          <LoadingIcon text={null} />
        ) : (
          <button
            className="ConnectionTableRowDenyBtn btn btn-warning"
            onClick={denyClick}
          >
            <FontAwesomeIcon icon="thumbs-down" />
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

export default ConnectionInTable;
