import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LoadingIcon } from "../../util";

const titleClass = "col-5";
const fromClass = "col-2";
const recycleClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-2";
const doUndoClass = "text-center col-1";

function Table(props) {
  const { shares, deletingShareIds, onDeleteShare } = props;
  const rows = shares.map(share => (
    <TableRow
      key={share.id}
      share={share}
      isDeletingShare={deletingShareIds.includes(share.id)}
      onDeleteShare={onDeleteShare}
    />
  ));

  return (
    <table
      id="InShareRequestTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={titleClass}>request</th>
          <th className={fromClass}>from</th>

          <th className={recycleClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={requestClass}>
            <FontAwesomeIcon icon="question" />
          </th>
          <th className={borrowClass}>
            <FontAwesomeIcon icon="user-clock" />
          </th>
          <th className={doUndoClass}>undo</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

Table.propTypes = {
  shares: PropTypes.array.isRequired,
  deletingShareIds: PropTypes.array.isRequired,
  onDeleteShare: PropTypes.func.isRequired
};

function TableRow(props) {
  const { onDeleteShare, share, isDeletingShare } = props;
  const { post } = share;

  const onDeleteClicked = e => {
    onDeleteShare(share.id);
  };

  const borrowShare = post.curBorrowShare;
  const borrower = borrowShare ? borrowShare.borrower : null;

  return (
    <tr className="InShareRequestTableRow">
      <td className={titleClass}>{post.title}</td>
      <td className={fromClass}>{post.user.email}</td>
      <td className={recycleClass}>{post.returnShares.length}</td>
      <td className={requestClass}>{post.requestShares.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
      <td className={doUndoClass}>
        {isDeletingShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InShareRequestTableRowUndoBtn btn btn-warning"
            onClick={onDeleteClicked}
          >
            <FontAwesomeIcon icon="undo-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isDeletingShare: PropTypes.bool.isRequired,
  onDeleteShare: PropTypes.func.isRequired
};

export { Table as InShareRequestTable };
