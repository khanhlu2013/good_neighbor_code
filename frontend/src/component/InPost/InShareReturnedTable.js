import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fromClass = "col-2";
const titleClass = "col-5";
const returnedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-2";

function InShareReturnedTable(props) {
  const { shares } = props;
  const rows = shares.map(share => (
    <InShareReturnedTableRow key={share.id} share={share} />
  ));

  return (
    <table
      id="InShareReturnedTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={fromClass}>Borrowed log</th>
          <th className={titleClass}>title</th>
          <th className={returnedClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={deniedClass}>
            <FontAwesomeIcon icon="thumbs-down" />
          </th>
          <th className={requestingClass}>
            <FontAwesomeIcon icon="question" />
          </th>
          <th className={borrowingClass}>
            <FontAwesomeIcon icon="user-clock" />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareReturnedTable.propTypes = {
  shares: PropTypes.array.isRequired
};

function InShareReturnedTableRow(props) {
  const { share } = props;
  const { post } = share;

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;
  return (
    <tr className="InShareReturnedTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={returnedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>{post.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
    </tr>
  );
}
InShareReturnedTableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { InShareReturnedTable };
