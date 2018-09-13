import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const userNameColClass = "col-9";
const removeColClass = "col-3 text-center";

function ConnectionDenyTable(props) {
  const { connections, loginUserId, updateConnectionCb } = props;

  const rows = connections.map(connection => (
    <ConnectionRow
      key={connection.id}
      connection={connection}
      loginUserId={loginUserId}
      updateConnectionCb={updateConnectionCb}
    />
  ));

  return (
    <div className="container-fluid">
      <table
        id="DenyFriendTable"
        className="table table-striped table-bordered"
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

ConnectionDenyTable.propTypes = {
  connections: PropTypes.array.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

function ConnectionRow(props) {
  const { connection, loginUserId, updateConnectionCb } = props;
  const undoClick = () => {
    updateConnectionCb(connection.id, true);
  };

  return (
    <tr className="ConnectionTableRow d-flex">
      <td className={userNameColClass}>
        {connection.getTheOtherUser(loginUserId).name}
      </td>
      <td className={removeColClass}>
        <button
          className="ConnectionTableRowApproveBtn btn btn-success"
          onClick={undoClick}
        >
          <FontAwesomeIcon icon="undo-alt" />
        </button>
      </td>
    </tr>
  );
}

ConnectionRow.propTypes = {
  connection: PropTypes.object.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

export { ConnectionDenyTable };
