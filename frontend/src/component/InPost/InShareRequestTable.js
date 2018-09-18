import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LoadingIcon } from "../../util";

const fromClass = "col-2";
const titleClass = "col-4";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowingClass = "text-center col-2";
const undoClass = "text-center col-1";

function InShareRequestTable(props) {
  const { shares, deletingShareIds, onDeleteRequestShareCb } = props;
  const rows = shares.map(share => (
    <InShareRequestTableRow
      key={share.id}
      share={share}
      isDeletingShare={deletingShareIds.includes(share.id)}
      onDeleteRequestShareCb={onDeleteRequestShareCb}
    />
  ));

  return (
    <table
      id="InShareRequestTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={fromClass}>Request</th>
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

InShareRequestTable.propTypes = {
  shares: PropTypes.array.isRequired,
  deletingShareIds: PropTypes.array.isRequired,
  onDeleteRequestShareCb: PropTypes.func.isRequired
};

function InShareRequestTableRow(props) {
  const { onDeleteRequestShareCb, share, isDeletingShare } = props;
  const { post } = share;

  const onDeleteRequestShare = e => {
    onDeleteRequestShareCb(share.id);
  };

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;

  return (
    <tr className="InShareRequestTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestClass}>{post.request.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
      <td className={undoClass}>
        {isDeletingShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InShareRequestTableRowUndoBtn btn btn-warning"
            onClick={onDeleteRequestShare}
          >
            <FontAwesomeIcon icon="undo-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}
InShareRequestTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isDeletingShare: PropTypes.bool.isRequired,
  onDeleteRequestShareCb: PropTypes.func.isRequired
};

//function InPostsToMeBorrowingTable(props) {}

export { InShareRequestTable };
