import React from "react";
import PropTypes from "prop-types";

function OutShareRequestingTable(props) {
  const { shares, onDecideOutShareRequestingCb } = props;

  const rows = shares.map(share => (
    <OutShareRequestingTableRow
      key={share.id}
      share={share}
      onDecideOutShareRequestingCb={onDecideOutShareRequestingCb}
    />
  ));
  return (
    <table id="OutShareRequestingTable-react">
      <thead>
        <tr>
          <th>User</th>
          <th>title</th>
          <th>description</th>
          <th>approve</th>
          <th>deny</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
OutShareRequestingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  onDecideOutShareRequestingCb: PropTypes.func.isRequired
};

function OutShareRequestingTableRow(props) {
  const {
    share: { id: shareID, borrower, post },
    onDecideOutShareRequestingCb
  } = props;

  const onApprove = e => {
    onDecideOutShareRequestingCb(shareID, true);
  };
  const onDeny = e => {
    onDecideOutShareRequestingCb(shareID, false);
  };

  return (
    <tr>
      <td>{borrower.email}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>
        <button onClick={onApprove}>approve</button>
      </td>
      <td>
        <button onClick={onDeny}>deny</button>
      </td>
    </tr>
  );
}
OutShareRequestingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onDecideOutShareRequestingCb: PropTypes.func.isRequired
};

export { OutShareRequestingTable };
