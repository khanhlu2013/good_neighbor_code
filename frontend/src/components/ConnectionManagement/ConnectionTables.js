import React from "react";
import PropTypes from "prop-types";

function ConnectionTables(props) {
  const { loginUserId, connections, modifyConnectionCb } = props;

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
        modifyConnectionCb={modifyConnectionCb}
      />
      <ConnectionTable
        id="InFriendTable"
        title="Incomming invite"
        connections={inFriends}
        loginUserId={loginUserId}
        approveColumn="approve"
        denyColumn="deny"
        modifyConnectionCb={modifyConnectionCb}
      />
      <ConnectionTable
        id="OutFriendTable"
        title="Outgoing invite"
        connections={outFriends}
        loginUserId={loginUserId}
        approveColumn={undefined}
        denyColumn="undo"
        modifyConnectionCb={modifyConnectionCb}
      />
      <ConnectionTable
        id="DenyFriendTable"
        title="Denied invite"
        connections={rejectedFriends}
        loginUserId={loginUserId}
        approveColumn="undo"
        denyColumn={undefined}
        modifyConnectionCb={modifyConnectionCb}
      />
    </div>
  );
}
ConnectionTables.propTypes = {
  loginUserId: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  modifyConnectionCb: PropTypes.func.isRequired
};

function ConnectionTable(props) {
  const {
    id,
    title,
    connections,
    loginUserId,
    approveColumn,
    denyColumn,
    modifyConnectionCb
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
              modifyConnectionCb={modifyConnectionCb}
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
  modifyConnectionCb: PropTypes.func.isRequired
};

function ConnectionRow(props) {
  const {
    connection,
    loginUserId,
    approveColumn,
    denyColumn,
    modifyConnectionCb
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
    modifyConnectionCb(connection._id, true);
  };
  const denyClick = () => {
    modifyConnectionCb(connection._id, false);
  };

  return (
    <tr id="ConnectionRow">
      <td>{theOther.name}</td>
      {approveColumn && (
        <td>
          <button onClick={approveClick}>{approveColumn}</button>
        </td>
      )}
      {denyColumn && (
        <td>
          <button onClick={denyClick}>{denyColumn}</button>
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
  modifyConnectionCb: PropTypes.func.isRequired
};

export { ConnectionTables };
