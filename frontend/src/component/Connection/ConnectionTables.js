import React from "react";
import PropTypes from "prop-types";

function ConnectionTables(props) {
  const { loginUserId, connections, updateConnectionCb } = props;

  const friends = connections.filter(
    connection => connection.approvedByFrom && connection.approvedByTo
  );
  const inFriends = connections.filter(
    connection =>
      connection.to._id === loginUserId &&
      connection.approvedByFrom &&
      connection.approvedByTo === undefined
  );
  const outFriends = connections.filter(
    connection =>
      connection.from._id === loginUserId &&
      connection.approvedByFrom &&
      connection.approvedByTo === undefined
  );
  const rejectedFriends = connections.filter(
    connection =>
      connection.to._id === loginUserId && connection.approvedByTo === false
  );

  return (
    <div id="ConnectionTables-react">
      <ConnectionTable
        id="FriendTable"
        title="Friends"
        connections={friends}
        loginUserId={loginUserId}
        approveColumn={undefined}
        denyColumn="remove"
        updateConnectionCb={updateConnectionCb}
      />
      <ConnectionTable
        id="InFriendTable"
        title="Incomming invite"
        connections={inFriends}
        loginUserId={loginUserId}
        approveColumn="approve"
        denyColumn="deny"
        updateConnectionCb={updateConnectionCb}
      />
      <ConnectionTable
        id="OutFriendTable"
        title="Outgoing invite"
        connections={outFriends}
        loginUserId={loginUserId}
        approveColumn={undefined}
        denyColumn="undo"
        updateConnectionCb={updateConnectionCb}
      />
      <ConnectionTable
        id="DenyFriendTable"
        title="Denied invite"
        connections={rejectedFriends}
        loginUserId={loginUserId}
        approveColumn="undo"
        denyColumn={undefined}
        updateConnectionCb={updateConnectionCb}
      />
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
    <div id={id}>
      <table>
        <caption>
          {title}: {connections.length} count
        </caption>
        <thead>
          <tr>
            <th>name</th>
            {approveColumn && <th>{approveColumn}</th>}
            {denyColumn && <th>{denyColumn}</th>}
          </tr>
        </thead>

        <tbody>
          {props.connections.map(connection => (
            <ConnectionRow
              key={connection._id}
              connection={connection}
              loginUserId={loginUserId}
              approveColumn={approveColumn}
              denyColumn={denyColumn}
              updateConnectionCb={updateConnectionCb}
            />
          ))}
        </tbody>
      </table>
    </div>
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
  if (connection.from._id === loginUserId) {
    theOther = connection.to;
  } else if (connection.to._id === loginUserId) {
    theOther = connection.from;
  } else {
    throw Error("Error: unexpected connection");
  }

  const approveClick = () => {
    updateConnectionCb(connection._id, true);
  };
  const denyClick = () => {
    updateConnectionCb(connection._id, false);
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
