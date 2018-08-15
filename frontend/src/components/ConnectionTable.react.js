import React from "react";
import API from "../api/profile-api.js";

function ConnectionTable(props) {
  const {
    title,
    connections,
    loginUserId,
    approveColumn,
    denyColumn,
    refreshConnectionsCb
  } = props;
  return (
    <div id="ConnectionTable-react">
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
              refreshConnectionsCb={refreshConnectionsCb}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConnectionRow(props) {
  const {
    connection,
    loginUserId,
    approveColumn,
    denyColumn,
    refreshConnectionsCb
  } = props;
  let theOther;
  if (connection.from._id === loginUserId) {
    theOther = connection.to;
  } else if (connection.to._id === loginUserId) {
    theOther = connection.from;
  } else {
    throw Error("Error: unexpected connection");
  }

  const click = isApprove => {
    (async () => {
      const response = await API.modifyConnection(connection._id, isApprove);
      if (response.status === 200) {
        refreshConnectionsCb();
      }
    })();
  };
  const approveClick = () => {
    click(true);
  };
  const denyClick = () => {
    click(false);
  };

  return (
    <tr>
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

export default ConnectionTable;
