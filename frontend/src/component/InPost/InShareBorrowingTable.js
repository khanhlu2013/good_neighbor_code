import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../util";

const fromClass = "col-3";
const titleClass = "col-5";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const returnClass = "text-center col-1";

function InShareBorrowingTable(props) {
  const { shares, onReturnBorrowingShareCb, returningShareIds } = props;
  const rows = shares.map(share => (
    <InShareBorrowingTableRow
      key={share.id}
      share={share}
      isReturningShare={returningShareIds.includes(share.id)}
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
          <th className={fromClass}>Borrowing</th>
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
          <th className={returnClass}>return</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareBorrowingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  returningShareIds: PropTypes.array.isRequired,
  onReturnBorrowingShareCb: PropTypes.func.isRequired
};

function InShareBorrowingTableRow(props) {
  const { onReturnBorrowingShareCb, share, isReturningShare } = props;
  const { post } = share;

  const onReturn = e => {
    onReturnBorrowingShareCb(share.id);
  };

  return (
    <tr className="InShareBorrowingTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestClass}>{post.request.length}</td>
      <td className={returnClass}>
        {isReturningShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InShareBorrowingTableRowReturnBtn btn btn-warning"
            onClick={onReturn}
          >
            <FontAwesomeIcon icon="location-arrow" />
          </button>
        )}
      </td>
    </tr>
  );
}
InShareBorrowingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onReturnBorrowingShareCb: PropTypes.func.isRequired
};

export { InShareBorrowingTable };
