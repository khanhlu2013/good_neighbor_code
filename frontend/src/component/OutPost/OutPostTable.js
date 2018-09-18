import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

const titleClass = "col-4";
const returnClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-2";
const activeClass = "text-center col-1";
const editClass = "text-center col-1";
const shareClass = "text-center col-1";

function Table(props) {
  const { posts, onEditPost, onDecidePost } = props;
  const postRows = posts.map(post => {
    return (
      <TableRow
        key={post.id}
        post={post}
        onEditPost={onEditPost}
        onDecidePost={onDecidePost}
      />
    );
  });
  return (
    <table
      id="OutPostTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
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
          <th className={activeClass}>active</th>
          <th className={editClass}>edit</th>
          <th className={shareClass}>share</th>
        </tr>
      </thead>
      <tbody>{postRows}</tbody>
    </table>
  );
}
Table.propTypes = {
  posts: PropTypes.array.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired
};

function TableRow(props) {
  const { post, onEditPost, onDecidePost } = props;

  const onEditBtnClicked = e => {
    onEditPost(post);
  };

  const onDecidePostClick = e => {
    onDecidePost(post);
  };
  const borrowShare = post.borrow;
  const borrower = borrowShare ? borrowShare.borrower : null;

  return (
    <tr
      className={className({
        OutPostTableRow: true,
        "table-warning": post.isRequestWithNoBorrow
      })}
    >
      <td className={titleClass}>{post.title}</td>
      <td className={returnClass}>{post.return.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestClass}>{post.request.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
      <td className={activeClass}>
        {post.isActive && <FontAwesomeIcon icon="check" />}
      </td>
      <td className={editClass}>
        <button
          className="OutPostTableRowEditBtn btn btn-primary"
          onClick={onEditBtnClicked}
        >
          <FontAwesomeIcon icon="pencil-alt" />
        </button>
      </td>
      <td className={shareClass}>
        {(post.denied.length !== 0 ||
          post.request.length !== 0 ||
          post.borrow) && (
          <button
            className="OutPostTableRowDecideBtn btn btn-success"
            onClick={onDecidePostClick}
          >
            <FontAwesomeIcon icon="share-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}

TableRow.propsType = {
  post: PropTypes.object.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired
};

export { Table as OutPostTable };
