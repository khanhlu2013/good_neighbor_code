import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

const titleClass = "col-2";
const descriptionClass = "col-2";
const borrowedClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestingClass = "text-center col-1";
const borrowingClass = "col-2";
const activeClass = "text-center col-1";
const editClass = "text-center col-1";
const shareClass = "text-center col-1";

function OutPostTable(props) {
  const { posts, onOpenCrudDialogCb, onOpenDecideDialogCb } = props;
  const postRows = posts.map(post => {
    return (
      <PostTableRow
        key={post.id}
        post={post}
        onOpenCrudDialogCb={onOpenCrudDialogCb}
        onOpenDecideDialogCb={onOpenDecideDialogCb}
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
          <th className={descriptionClass}>description</th>
          <th className={borrowedClass}>borrowed</th>
          <th className={deniedClass}>denied</th>
          <th className={requestingClass}>requesting</th>
          <th className={borrowingClass}>borrowing</th>
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
  onOpenCrudDialogCb: PropTypes.func.isRequired,
  onOpenDecideDialogCb: PropTypes.func.isRequired
};

function PostTableRow(props) {
  const { post, onOpenCrudDialogCb, onOpenDecideDialogCb } = props;

  const onCrudPostClick = e => {
    onOpenCrudDialogCb(post);
  };

  const onDecidePostClick = e => {
    onOpenDecideDialogCb(post);
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
      <td className={descriptionClass}>{post.description}</td>
      <td className={borrowedClass}>{post.borrowed.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestingClass}>{post.requesting.length}</td>
      <td className={borrowingClass}>{borrower ? borrower.email : ""}</td>
      <td className={activeClass}>{post.isActive.toString()}</td>
      <td className={editClass}>
        <button
          className="OutPostTableRowEditBtn btn btn-primary"
          onClick={onCrudPostClick}
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
  onOpenCrudDialogCb: PropTypes.func.isRequired,
  onOpenDecideDialogCb: PropTypes.func.isRequired
};

export { OutPostTable };
