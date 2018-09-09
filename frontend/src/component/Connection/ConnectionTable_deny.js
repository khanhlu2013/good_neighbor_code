import React from "react";
import PropTypes from "prop-types";

const userNameColClass = "col-9";
const removeColClass = "col-3 text-center";

function ConnectionDenyTable(props) {
  const { connections, loginUserId, updateConnectionCb } = props;

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

        <tbody>
          {connections.map(connection => (
            <ConnectionRow
              key={connection.id}
              connection={connection}
              loginUserId={loginUserId}
              updateConnectionCb={updateConnectionCb}
            />
          ))}
        </tbody>
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
          className="ConnectionTableRowDenyBtn btn btn-success"
          onClick={undoClick}
        >
          undo
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
