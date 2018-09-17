import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";
import { LoadingIcon } from "../../util";

const fromClass = "col-2";
const titleClass = "col-5";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-1";
const requestClass = "text-center col-1";

function InPostTable(props) {
  const {
    inPosts,
    requestingPostIds,
    onCreateRequestingShareCb,
    loginUser
  } = props;
  const rows = inPosts.map(inPost => (
    <InPostTableRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
      isRequestingPost={requestingPostIds.includes(inPost.id)}
      onCreateRequestingShareCb={onCreateRequestingShareCb}
    />
  ));

  return (
    <table
      id="InPostTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={fromClass}>All posts</th>
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
          <th className={requestClass}>request</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InPostTable.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPosts: PropTypes.array.isRequired,
  requestingPostIds: PropTypes.array.isRequired,
  onCreateRequestingShareCb: PropTypes.func.isRequired
};

function InPostTableRow(props) {
  const {
    loginUser,
    inPost,
    isRequestingPost,
    onCreateRequestingShareCb
  } = props;
  const onCreateShare = e => {
    onCreateRequestingShareCb(inPost.id);
  };
  const isMeRequested = inPost.isRequestingBy(loginUser.id);
  const borrowingShare = inPost.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;
  const isMeBorrowed = borrower && borrower.id === loginUser.id;

  return (
    <tr
      className={className({
        InPostTableRow: true,
        "table-success": isMeRequested || isMeBorrowed
      })}
    >
      <td className={fromClass}>{inPost.user.email}</td>
      <td className={titleClass}>{inPost.title}</td>
      <td className={borrowedClass}>{inPost.borrowed.length}</td>
      <td className={deniedClass}>{inPost.denied.length}</td>
      <td className={requestingClass}>{inPost.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
      <td className={requestClass}>
        {isMeRequested || isMeBorrowed ? (
          <span>
            <FontAwesomeIcon icon="check" />
          </span>
        ) : isRequestingPost ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          <button
            className="InPostTableRowBorrowBtn btn btn-success"
            onClick={onCreateShare}
          >
            <FontAwesomeIcon icon="question" />
          </button>
        )}
      </td>
    </tr>
  );
}
InPostTableRow.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPost: PropTypes.object.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onCreateRequestingShareCb: PropTypes.func.isRequired
};

export { InPostTable };
