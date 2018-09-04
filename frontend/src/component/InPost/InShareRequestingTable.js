import React from "react";
import PropTypes from "prop-types";

function InShareRequestingTable(props) {
  const { requestingShares, onDeleteRequestingShareCb } = props;
  const rows = requestingShares.map(share => (
    <InShareRequestingTableRow
      key={share.id}
      requestingShare={share}
      onDeleteRequestingShareCb={onDeleteRequestingShareCb}
    />
  ));

  return (
    <table id="InShareRequestingTable-react">
      <thead>
        <tr>
          <th>From</th>
          <th>title</th>
          <th>description</th>
          <th>borrowed</th>
          <th>denied</th>
          <th>requesting</th>
          <th>borrowing</th>
          <th>undo</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareRequestingTable.propTypes = {
  requestingShares: PropTypes.array.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

function InShareRequestingTableRow(props) {
  const { onDeleteRequestingShareCb, requestingShare } = props;
  const { post } = requestingShare;

  const onDeleteRequestingShare = e => {
    onDeleteRequestingShareCb(requestingShare.id);
  };

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;

  return (
    <tr className="InShareRequestingTableRow">
      <td>{post.user.email}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.borrowed.length}</td>
      <td>{post.denied.length}</td>
      <td>me + {post.requesting.length - 1}</td>
      <td>{borrower ? borrower.email : ""}</td>
      <td>
        <button
          className="InShareRequestingTableRowUndoBtn"
          onClick={onDeleteRequestingShare}
        >
          undo
        </button>
      </td>
    </tr>
  );
}
InShareRequestingTableRow.propTypes = {
  requestingShare: PropTypes.object.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

//function InPostsToMeBorrowingTable(props) {}

export { InShareRequestingTable };
