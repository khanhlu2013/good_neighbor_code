import React from "react";
import PropTypes from "prop-types";

function InShareBorrowedTable(props) {
  const { shares } = props;
  const rows = shares.map(share => (
    <InShareBorrowedTableRow key={share.id} share={share} />
  ));

  return (
    <table id="InShareBorrowedTable-react">
      <thead>
        <tr>
          <th>From</th>
          <th>title</th>
          <th>description</th>
          <th>borrowed</th>
          <th>denied</th>
          <th>requesting</th>
          <th>borrowing</th>
          <th>return</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareBorrowedTable.propTypes = {
  shares: PropTypes.array.isRequired
};

function InShareBorrowedTableRow(props) {
  const { share } = props;
  const { post } = share;

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;
  return (
    <tr className="InShareBorrowedTableRow">
      <td>{post.user.email}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.borrowed.length}</td>
      <td>{post.denied.length}</td>
      <td>{post.requesting.length}</td>
      <td>{borrower ? borrower.email : ""}</td>
    </tr>
  );
}
InShareBorrowedTableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { InShareBorrowedTable };
