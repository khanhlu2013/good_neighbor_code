import React from "react";
import PropTypes from "prop-types";

const fromClass = "col-2";
const titleClass = "col-3";
const descriptionClass = "col-2";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-2";

function InShareBorrowedTable(props) {
  const { shares } = props;
  const rows = shares.map(share => (
    <InShareBorrowedTableRow key={share.id} share={share} />
  ));

  return (
    <table
      id="InShareBorrowedTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={fromClass}>From</th>
          <th className={titleClass}>title</th>
          <th className={descriptionClass}>description</th>
          <th className={borrowedClass}>borrowed</th>
          <th className={deniedClass}>denied</th>
          <th className={requestingClass}>requesting</th>
          <th className={borrowingClass}>borrowing</th>
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
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={descriptionClass}>{post.description}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>{post.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
    </tr>
  );
}
InShareBorrowedTableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { InShareBorrowedTable };
