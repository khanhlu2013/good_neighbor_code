import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";
import { LoadingIcon } from "../../util";

const fromClass = "col-2";
const titleClass = "col-5";
const returnClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-1";

function InPostTable(props) {
  const {
    inPosts,
    requestingPostIds,
    onCreateRequestShareCb,
    loginUser
  } = props;
  const rows = inPosts.map(inPost => (
    <InPostTableRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
      isRequestingPost={requestingPostIds.includes(inPost.id)}
      onCreateRequestShareCb={onCreateRequestShareCb}
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

InPostTable.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPosts: PropTypes.array.isRequired,
  requestingPostIds: PropTypes.array.isRequired,
  onCreateRequestShareCb: PropTypes.func.isRequired
};

function InPostTableRow(props) {
  const { loginUser, inPost, isRequestingPost, onCreateRequestShareCb } = props;
  const onCreateShare = e => {
    onCreateRequestShareCb(inPost.id);
  };
  const isMeRequest = inPost.isRequestBy(loginUser.id);
  const borrowShare = inPost.borrow;
  const borrower = borrowShare ? borrowShare.borrower : null;
  const isMeBorrow = borrower && borrower.id === loginUser.id;

  return (
    <tr
      className={className({
        InPostTableRow: true,
        "table-success": isMeRequest || isMeBorrow
      })}
    >
      <td className={fromClass}>{inPost.user.email}</td>
      <td className={titleClass}>{inPost.title}</td>
      <td className={returnClass}>{inPost.return.length}</td>
      <td className={deniedClass}>{inPost.denied.length}</td>
      <td className={requestClass}>{inPost.request.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
      <td className={requestClass}>
        {isMeRequest || isMeBorrow ? (
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
  onCreateRequestShareCb: PropTypes.func.isRequired
};

export { InPostTable };
