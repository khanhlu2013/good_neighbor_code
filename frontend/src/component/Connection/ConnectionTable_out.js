import React from "react";
import PropTypes from "prop-types";

const removeColClass = "col-3 text-center";
const userNameColClass = "col-9";

function ConnectionOutTable(props) {
  const { connections, loginUserId, updateConnectionCb } = props;

  return (
    <div className="container-fluid">
      <table id="OutFriendTable" className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr className="d-flex">
            <th className={userNameColClass}>Waiting for friend response</th>
            <th className={removeColClass}>remove</th>
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

ConnectionOutTable.propTypes = {
  connections: PropTypes.array.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

function ConnectionRow(props) {
  const { connection, loginUserId, updateConnectionCb } = props;

  const onRemoveClick = () => {
    updateConnectionCb(connection.id, false);
  };

  return (
    <tr className="ConnectionTableRow d-flex">
      <td className={userNameColClass}>
        {connection.getTheOtherUser(loginUserId).name}
      </td>
      <td className={removeColClass}>
        <button
          className="ConnectionTableRowDenyBtn btn btn-warning"
          onClick={onRemoveClick}
        >
          X
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

export { ConnectionOutTable };
