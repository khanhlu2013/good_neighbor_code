import React from "react";
import PropTypes from "prop-types";

function InShareBorrowingTable(props) {
  const { shares, onReturnBorrowingShareCb } = props;
  const rows = shares.map(share => (
    <InShareBorrowingTableRow
      key={share.id}
      borrowingShare={share}
      onReturnBorrowingShareCb={onReturnBorrowingShareCb}
    />
  ));

  return (
    <table id="InShareBorrowingTable-react">
      <thead>
        <tr>
          <th>From</th>
          <th>title</th>
          <th>description</th>
          <th>borrowed</th>
          <th>denied</th>
          <th>requesting</th>
          <th>return</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareBorrowingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  onReturnBorrowingShareCb: PropTypes.func.isRequired
};

function InShareBorrowingTableRow(props) {
  const { onReturnBorrowingShareCb, borrowingShare } = props;
  const { post } = borrowingShare;

  const onReturn = e => {
    onReturnBorrowingShareCb(borrowingShare.id);
  };

  return (
    <tr className="InShareBorrowingTableRow">
      <td>{post.user.email}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.borrowed.length}</td>
      <td>{post.denied.length}</td>
      <td>{post.requesting.length}</td>
      <td>
        <button
          className="InShareBorrowingTableRowReturnBtn"
          onClick={onReturn}
        >
          return
        </button>
      </td>
    </tr>
  );
}
InShareBorrowingTableRow.propTypes = {
  borrowingShare: PropTypes.object.isRequired,
  onReturnBorrowingShareCb: PropTypes.func.isRequired
};

export { InShareBorrowingTable };
