import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../util";
import className from "classnames";

const titleClass = "col-5";
const fromClass = "col-3";
const recycleClass = "text-center col-1";
const requestClass = "text-center col-1";
const doAwareClass = "text-center col-1";
const doReturnClass = "text-center col-1";

function Table(props) {
  const {
    shares,
    onReturnShare,
    onAwareShare,
    awaringShareIds,
    returningShareIds
  } = props;
  const rows = shares.map(share => (
    <TableRow
      key={share.id}
      share={share}
      isAwaringShare={awaringShareIds.includes(share.id)}
      isReturningShare={returningShareIds.includes(share.id)}
      onReturnShare={onReturnShare}
      onAwareShare={onAwareShare}
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
          <th className={doAwareClass}>ok</th>
          <th className={doReturnClass}>return</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

Table.propTypes = {
  shares: PropTypes.array.isRequired,
  awaringShareIds: PropTypes.array.isRequired,
  returningShareIds: PropTypes.array.isRequired,
  onReturnShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired
};

function TableRow(props) {
  const {
    onReturnShare,
    onAwareShare,
    share,
    isAwaringShare,
    isReturningShare
  } = props;
  const { post } = share;

  const onReturnClicked = e => {
    onReturnShare(share.id);
  };

  const onAwareClicked = e => {
    onAwareShare(share.id);
  };

  let awareContent;
  if (share.isAwareApprove) {
    awareContent = <FontAwesomeIcon icon="check" />;
  } else if (isAwaringShare) {
    awareContent = <LoadingIcon text={null} isAnimate={true} />;
  } else {
    awareContent = (
      <button
        className="InShareBorrowTableRowAwareBtn btn btn-success"
        onClick={onAwareClicked}
      >
        <FontAwesomeIcon icon="check" />
      </button>
    );
  }

  let returnContent;
  if (isReturningShare) {
    returnContent = <LoadingIcon text={null} isAnimate={true} />;
  } else if (share.isAwareApprove) {
    returnContent = (
      <button
        className="InShareBorrowTableRowReturnBtn btn btn-warning"
        onClick={onReturnClicked}
      >
        <FontAwesomeIcon icon="location-arrow" />
      </button>
    );
  } else {
    returnContent = null;
  }

  return (
    <tr
      className={className({
        InShareBorrowTableRow: true,
        "table-warning": !share.isAwareApprove
      })}
    >
      <td className={titleClass}>{post.title}</td>
      <td className={fromClass}>{post.user.email}</td>
      <td className={recycleClass}>{post.returnShares.length}</td>
      <td className={requestClass}>{post.requestShares.length}</td>
      <td className={doAwareClass}>{awareContent}</td>
      <td className={doReturnClass}>{returnContent}</td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  onReturnShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired
};

export { Table as InShareBorrowTable };
