import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../util";

const fromClass = "col-3";
const titleClass = "col-5";
const returnClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";

function InShareBorrowTable(props) {
  const { shares, onReturnBorrowShareCb, returningShareIds } = props;
  const rows = shares.map(share => (
    <InShareBorrowTableRow
      key={share.id}
      share={share}
      isReturningShare={returningShareIds.includes(share.id)}
      onReturnBorrowShareCb={onReturnBorrowShareCb}
    />
  ));

  return (
    <table
      id="InShareBorrowTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={titleClass}>borrow</th>
          <th className={fromClass}>from</th>
          <th className={returnClass}>
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

InShareBorrowTable.propTypes = {
  shares: PropTypes.array.isRequired,
  returningShareIds: PropTypes.array.isRequired,
  onReturnBorrowShareCb: PropTypes.func.isRequired
};

function InShareBorrowTableRow(props) {
  const { onReturnBorrowShareCb, share, isReturningShare } = props;
  const { post } = share;

  const onReturn = e => {
    onReturnBorrowShareCb(share.id);
  };

  return (
    <tr className="InShareBorrowTableRow">
      <td className={titleClass}>{post.title}</td>
      <td className={fromClass}>{post.user.email}</td>
      <td className={returnClass}>{post.return.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestClass}>{post.request.length}</td>
      <td className={returnClass}>
        {isReturningShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InShareBorrowTableRowReturnBtn btn btn-warning"
            onClick={onReturn}
          >
            <FontAwesomeIcon icon="location-arrow" />
          </button>
        )}
      </td>
    </tr>
  );
}
InShareBorrowTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onReturnBorrowShareCb: PropTypes.func.isRequired
};

export { InShareBorrowTable };
