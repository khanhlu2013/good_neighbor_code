import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";
import { LoadingIcon } from "../../util";

const titleClass = "col-5";
const fromClass = "col-2";
const returnClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-1";

function Table(props) {
  const { posts, requestingPostIds, onCreateShare, loginUser } = props;
  const rows = posts.map(inPost => (
    <TableRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
      isRequestingPost={requestingPostIds.includes(inPost.id)}
      onCreateShare={onCreateShare}
    />
  ));

  return (
    <table
      id="InPostTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={titleClass}>all</th>
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
          <th className={borrowClass}>
            <FontAwesomeIcon icon="user-clock" />
          </th>
          <th className={requestClass}>request</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

Table.propTypes = {
  loginUser: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  requestingPostIds: PropTypes.array.isRequired,
  onCreateShare: PropTypes.func.isRequired
};

function TableRow(props) {
  const { loginUser, inPost, isRequestingPost, onCreateShare } = props;
  const onCreateShareClicked = e => {
    onCreateShare(inPost.id);
  };
  const isMeRequest = inPost.isRequestBy(loginUser.id);
  const borrowShare = inPost.borrow;
  const borrower = borrowShare ? borrowShare.borrower : null;
  const isMeBorrow = borrower && borrower.id === loginUser.id;

  let requestColumnHtml;
  if (isMeRequest || isMeBorrow) {
    requestColumnHtml = (
      <span>
        <FontAwesomeIcon icon="check" />
      </span>
    );
  } else if (isRequestingPost) {
    requestColumnHtml = <LoadingIcon text={null} isAnimate={true} />;
  } else if (!inPost.isActive) {
    requestColumnHtml = "not active";
  } else {
    requestColumnHtml = (
      <button
        className="InPostTableRowBorrowBtn btn btn-success"
        onClick={onCreateShareClicked}
      >
        <FontAwesomeIcon icon="question" />
      </button>
    );
  }

  return (
    <tr
      className={className({
        InPostTableRow: true,
        "table-success": isMeRequest || isMeBorrow
      })}
    >
      <td className={titleClass}>{inPost.title}</td>
      <td className={fromClass}>{inPost.user.email}</td>
      <td className={returnClass}>{inPost.return.length}</td>
      <td className={deniedClass}>{inPost.denied.length}</td>
      <td className={requestClass}>{inPost.request.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
      <td className={requestClass}>{requestColumnHtml}</td>
    </tr>
  );
}
TableRow.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPost: PropTypes.object.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onCreateShare: PropTypes.func.isRequired
};

export { Table as InPostTable };
