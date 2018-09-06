import React from "react";
import PropTypes from "prop-types";

function ConnectionTable(props) {
  const {
    id,
    title,
    connections,
    loginUserId,
    approveColumn,
    denyColumn,
    updateConnectionCb
  } = props;

  return (
    <table id={id} className="table">
      <caption>{title}</caption>
      <thead className="thead-light">
        <tr>
          <th>name</th>
          {approveColumn && <th>{approveColumn}</th>}
          {denyColumn && <th>{denyColumn}</th>}
        </tr>
      </thead>

      <tbody>
        {connections.map(connection => (
          <ConnectionRow
            key={connection.id}
            connection={connection}
            loginUserId={loginUserId}
            approveColumn={approveColumn}
            denyColumn={denyColumn}
            updateConnectionCb={updateConnectionCb}
          />
        ))}
      </tbody>
    </table>
  );
}

ConnectionTable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  loginUserId: PropTypes.string.isRequired,
  approveColumn: PropTypes.string,
  denyColumn: PropTypes.string,
  updateConnectionCb: PropTypes.func.isRequired
};

function ConnectionRow(props) {
  const {
    connection,
    loginUserId,
    approveColumn,
    denyColumn,
    updateConnectionCb
  } = props;
  let theOther;
  if (connection.from.id === loginUserId) {
    theOther = connection.to;
  } else if (connection.to.id === loginUserId) {
    theOther = connection.from;
  } else {
    throw Error("Error: unexpected connection");
  }

  const approveClick = () => {
    updateConnectionCb(connection.id, true);
  };
  const denyClick = () => {
    updateConnectionCb(connection.id, false);
  };

  return (
    <tr className="ConnectionTableRow">
      <td className="testing">{theOther.name}</td>
      {approveColumn && (
        <td>
          <button
            className="ConnectionTableRowApproveBtn"
            onClick={approveClick}
          >
            {approveColumn}
          </button>
        </td>
      )}
      {denyColumn && (
        <td>
          <button className="ConnectionTableRowDenyBtn" onClick={denyClick}>
            {denyColumn}
          </button>
        </td>
      )}
    </tr>
  );
}

ConnectionRow.propTypes = {
  connection: PropTypes.object.isRequired,
  loginUserId: PropTypes.string.isRequired,
  approveColumn: PropTypes.string,
  denyColumn: PropTypes.string,
  updateConnectionCb: PropTypes.func.isRequired
};

export { ConnectionTable };
