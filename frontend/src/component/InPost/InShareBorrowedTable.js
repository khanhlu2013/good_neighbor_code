import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fromClass = "col-2";
const titleClass = "col-5";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-2";

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
          <th className={fromClass}>Borrowed log</th>
          <th className={titleClass}>title</th>
          <th className={borrowedClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={deniedClass}>
            <FontAwesomeIcon icon="thumbs-down" />
          </th>
          <th className={requestClass}>
            <FontAwesomeIcon icon="question" />
          </th>
          <th className={borrowClass}>
            <FontAwesomeIcon icon="user-clock" />
          </th>
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

  const borrowShare = post.borrow;
  const borrower = borrowShare ? borrowShare.borrower : null;
  return (
    <tr className="InShareBorrowedTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestClass}>{post.request.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
    </tr>
  );
}
InShareBorrowedTableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { InShareBorrowedTable };
