import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

const fromClass = "col-2";
const titleClass = "col-3";
const descriptionClass = "col-2";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-1";
const requestClass = "text-center col-1";

function InPostTable(props) {
  const { inPosts, onCreateRequestingShareCb, loginUser } = props;
  const rows = inPosts.map(inPost => (
    <InPostTableRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
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
          <th className={fromClass}>From</th>
          <th className={titleClass}>title</th>
          <th className={descriptionClass}>description</th>
          <th className={borrowedClass}>borrowed</th>
          <th className={deniedClass}>denied</th>
          <th className={requestingClass}>requesting</th>
          <th className={borrowingClass}>borrowing</th>
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
  onCreateRequestingShareCb: PropTypes.func.isRequired
};

function InPostTableRow(props) {
  const { loginUser, inPost, onCreateRequestingShareCb } = props;
  const onCreateShare = e => {
    onCreateRequestingShareCb(inPost.id);
  };
  const isMeRequesting = inPost.isRequestingBy(loginUser.id);
  const borrowingShare = inPost.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;
  const isMeBorrowing = borrower && borrower.id === loginUser.id;

  return (
    <tr
      className={className({
        InPostTableRow: true,
        "table-success": isMeRequesting || isMeBorrowing
      })}
    >
      <td className={fromClass}>{inPost.user.email}</td>
      <td className={titleClass}>{inPost.title}</td>
      <td className={descriptionClass}>{inPost.description}</td>
      <td className={borrowedClass}>{inPost.borrowed.length}</td>
      <td className={deniedClass}>{inPost.denied.length}</td>
      <td className={requestingClass}>{inPost.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
      <td className={requestClass}>
        {isMeRequesting || isMeBorrowing ? (
          <span>
            <FontAwesomeIcon icon="check" />
          </span>
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
  onCreateRequestingShareCb: PropTypes.func.isRequired
};

export { InPostTable };
