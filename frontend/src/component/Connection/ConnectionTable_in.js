import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const userNameColClass = "col-8";
const decideColClass = "col-2 text-center";

function ConnectionInTable(props) {
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
      <table id="InFriendTable" className="table table-striped table-bordered">
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
    </div>
  );
}

ConnectionInTable.propTypes = {
  connections: PropTypes.array.isRequired,
  loginUserId: PropTypes.string.isRequired,
  updateConnectionCb: PropTypes.func.isRequired
};

function ConnectionRow(props) {
  const { connection, loginUserId, updateConnectionCb } = props;

  const approveClick = () => {
    updateConnectionCb(connection.id, true);
  };
  const denyClick = () => {
    updateConnectionCb(connection.id, false);
  };

  return (
    <tr className="ConnectionTableRow d-flex">
      <td className="col-8">{connection.getTheOtherUser(loginUserId).name}</td>

      <td className={decideColClass}>
        <button
          className="ConnectionTableRowApproveBtn btn btn-success"
          onClick={approveClick}
        >
          <FontAwesomeIcon icon="thumbs-up" />
        </button>
      </td>
      <td className={decideColClass}>
        <button
          className="ConnectionTableRowDenyBtn btn btn-warning"
          onClick={denyClick}
        >
          <FontAwesomeIcon icon="thumbs-down" />
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

export { ConnectionInTable };
