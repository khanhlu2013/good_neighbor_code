import React from "react";
import PropTypes from "prop-types";

function ConnectionTables(props) {
  const { loginUserId, connections, updateConnectionCb } = props;

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
    <div id="ConnectionTables-react" className="container">
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
          <ConnectionTable
            id="InFriendTable"
            title="Friend Incomming Requests"
            connections={inFriends}
            loginUserId={loginUserId}
            approveColumn="approve"
            denyColumn="deny"
            updateConnectionCb={updateConnectionCb}
          />
          <ConnectionTable
            id="OutFriendTable"
            title="Your Outgoing Requests"
            connections={outFriends}
            loginUserId={loginUserId}
            approveColumn={undefined}
            denyColumn="undo"
            updateConnectionCb={updateConnectionCb}
          />
          <ConnectionTable
            id="DenyFriendTable"
            title="Your denal of Friend Incomming Requests"
            connections={rejectedFriends}
            loginUserId={loginUserId}
            approveColumn="undo"
            denyColumn={undefined}
            updateConnectionCb={updateConnectionCb}
          />
        </div>
      </div>
    </div>
  );
}
ConnectionTables.propTypes = {
  loginUserId: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

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

export { ConnectionTables };
