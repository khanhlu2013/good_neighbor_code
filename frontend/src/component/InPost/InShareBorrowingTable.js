import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fromClass = "col-2";
const titleClass = "col-3";
const descriptionClass = "col-3";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const returnClass = "text-center col-1";

function InShareBorrowingTable(props) {
  const { shares, onReturnBorrowingShareCb } = props;
  const rows = shares.map(share => (
    <InShareBorrowingTableRow
      key={share.id}
      share={share}
      onReturnBorrowingShareCb={onReturnBorrowingShareCb}
    />
  ));

  return (
    <table
      id="InShareBorrowingTable-react"
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
          <th className={returnClass}>return</th>
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
  const { onReturnBorrowingShareCb, share } = props;
  const { post } = share;

  const onReturn = e => {
    onReturnBorrowingShareCb(share.id);
  };

  return (
    <tr className="InShareBorrowingTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={descriptionClass}>{post.description}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>{post.requesting.length}</td>
      <td className={returnClass}>
        <button
          className="InShareBorrowingTableRowReturnBtn btn btn-warning"
          onClick={onReturn}
        >
          <FontAwesomeIcon icon="location-arrow" />
        </button>
      </td>
    </tr>
  );
}
InShareBorrowingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onReturnBorrowingShareCb: PropTypes.func.isRequired
};

export { InShareBorrowingTable };
