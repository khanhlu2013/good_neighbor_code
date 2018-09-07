import React from "react";
import PropTypes from "prop-types";

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
    <table id="OutPostTable-react" className="table table-striped">
      <thead className="thead-light">
        <tr>
          <th>title</th>
          <th>description</th>
          <th>borrowed</th>
          <th>denied</th>
          <th>requesting</th>
          <th>borrowing</th>
          <th>active</th>
          <th>edit</th>
          <th>share</th>
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
  const isRequesting = post.requesting.length !== 0;

  return (
    <tr className={"OutPostTableRow" + (isRequesting ? " table-warning" : "")}>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.borrowed.length}</td>
      <td>{post.denied.length}</td>
      <td>{post.requesting.length}</td>
      <td>{borrower ? borrower.email : ""}</td>
      <td>{post.isActive.toString()}</td>
      <td>
        <button
          className="OutPostTableRowEditBtn btn btn-primary"
          onClick={onCrudPostClick}
        >
          edit
        </button>
      </td>
      <td>
        {(post.denied.length !== 0 ||
          post.requesting.length !== 0 ||
          post.borrowing) && (
          <button
            className="OutPostTableRowDecideBtn btn btn-success"
            onClick={onDecidePostClick}
          >
            share
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
