import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

const titleClass = "col-4";
const returnedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "text-center col-2";
const activeClass = "text-center col-1";
const editClass = "text-center col-1";
const shareClass = "text-center col-1";

function OutPostTable(props) {
  const { posts, onEditPost, onDecidePost } = props;
  const postRows = posts.map(post => {
    return (
      <PostTableRow
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
          <th className={returnedClass}>
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
          <th className={activeClass}>active</th>
          <th className={editClass}>edit</th>
          <th className={shareClass}>share</th>
        </tr>
      </thead>
      <tbody>{postRows}</tbody>
    </table>
  );
}
OutPostTable.propTypes = {
  posts: PropTypes.array.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired
};

function PostTableRow(props) {
  const { post, onEditPost, onDecidePost } = props;

  const onEditBtnClicked = e => {
    onEditPost(post);
  };

  const onDecidePostClick = e => {
    onDecidePost(post);
  };
  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;

  return (
    <tr
      className={className({
        OutPostTableRow: true,
        "table-warning": post.isRequestingWithNoBorrowing
      })}
    >
      <td className={titleClass}>{post.title}</td>
      <td className={returnedClass}>{post.returned.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>{post.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
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
          post.requesting.length !== 0 ||
          post.borrowing) && (
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

PostTableRow.propsType = {
  post: PropTypes.object.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired
};

export { OutPostTable };
