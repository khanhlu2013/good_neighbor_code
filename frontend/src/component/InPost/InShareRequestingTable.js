import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fromClass = "col-2";
const titleClass = "col-2";
const descriptionClass = "col-2";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-2";
const undoClass = "text-center col-1";

function InShareRequestingTable(props) {
  const { shares, onDeleteRequestingShareCb } = props;
  const rows = shares.map(share => (
    <InShareRequestingTableRow
      key={share.id}
      share={share}
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
          <th className={fromClass}>From</th>
          <th className={titleClass}>title</th>
          <th className={descriptionClass}>description</th>
          <th className={borrowedClass}>borrowed</th>
          <th className={deniedClass}>denied</th>
          <th className={requestingClass}>requesting</th>
          <th className={borrowingClass}>borrowing</th>
          <th className={undoClass}>undo</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InShareRequestingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

function InShareRequestingTableRow(props) {
  const { onDeleteRequestingShareCb, share } = props;
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
      <td className={descriptionClass}>{post.description}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>me + {post.requesting.length - 1}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
      <td className={undoClass}>
        <button
          className="InShareRequestingTableRowUndoBtn btn btn-warning"
          onClick={onDeleteRequestingShare}
        >
          <FontAwesomeIcon icon="undo-alt" />
        </button>
      </td>
    </tr>
  );
}
InShareRequestingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

//function InPostsToMeBorrowingTable(props) {}

export { InShareRequestingTable };
