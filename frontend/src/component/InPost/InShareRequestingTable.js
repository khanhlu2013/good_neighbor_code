import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LoadingIcon } from "../../util";

const fromClass = "col-2";
const titleClass = "col-4";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-2";
const undoClass = "text-center col-1";

function InShareRequestingTable(props) {
  const { shares, deletingShareIds, onDeleteRequestingShareCb } = props;
  const rows = shares.map(share => (
    <InShareRequestingTableRow
      key={share.id}
      share={share}
      isDeletingShare={deletingShareIds.includes(share.id)}
      onDeleteRequestingShareCb={onDeleteRequestingShareCb}
    />
  ));

  return (
    <table
      id="InShareRequestingTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={fromClass}>Requesting</th>
          <th className={titleClass}>title</th>
          <th className={borrowedClass}>
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
          <th className={undoClass}>undo</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareRequestingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  deletingShareIds: PropTypes.array.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

function InShareRequestingTableRow(props) {
  const { onDeleteRequestingShareCb, share, isDeletingShare } = props;
  const { post } = share;

  const onDeleteRequestingShare = e => {
    onDeleteRequestingShareCb(share.id);
  };

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;

  return (
    <tr className="InShareRequestingTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>{post.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
      <td className={undoClass}>
        {isDeletingShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InShareRequestingTableRowUndoBtn btn btn-warning"
            onClick={onDeleteRequestingShare}
          >
            <FontAwesomeIcon icon="undo-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}
InShareRequestingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isDeletingShare: PropTypes.bool.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

//function InPostsToMeBorrowingTable(props) {}

export { InShareRequestingTable };
