import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../util";

const fromClass = "col-3";
const titleClass = "col-5";
const recycleClass = "text-center col-1";
const requestClass = "text-center col-1";
const doReturnClass = "text-center col-1";

function Table(props) {
  const { shares, onReturnShare, returningShareIds } = props;
  const rows = shares.map(share => (
    <TableRow
      key={share.id}
      share={share}
      isReturningShare={returningShareIds.includes(share.id)}
      onReturnShare={onReturnShare}
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
          <th className={recycleClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={requestClass}>
            <FontAwesomeIcon icon="question" />
          </th>
          <th className={doReturnClass}>return</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

Table.propTypes = {
  shares: PropTypes.array.isRequired,
  returningShareIds: PropTypes.array.isRequired,
  onReturnShare: PropTypes.func.isRequired
};

function TableRow(props) {
  const { onReturnShare, share, isReturningShare } = props;
  const { post } = share;

  const onReturnClicked = e => {
    onReturnShare(share.id);
  };

  return (
    <tr className="InShareBorrowTableRow">
      <td className={titleClass}>{post.title}</td>
      <td className={fromClass}>{post.user.email}</td>
      <td className={recycleClass}>{post.returnShares.length}</td>
      <td className={requestClass}>{post.requestShares.length}</td>
      <td className={doReturnClass}>
        {isReturningShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InShareBorrowTableRowReturnBtn btn btn-warning"
            onClick={onReturnClicked}
          >
            <FontAwesomeIcon icon="location-arrow" />
          </button>
        )}
      </td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onReturnShare: PropTypes.func.isRequired
};

export { Table as InShareBorrowTable };
