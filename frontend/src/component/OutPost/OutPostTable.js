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
    <table id="OutPostTable-react">
      <thead>
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
  return (
    <tr className="OutPostTableRow">
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.borrowed.length}</td>
      <td>{post.denied.length}</td>
      <td>{post.requesting.length}</td>
      <td>{borrower ? borrower.email : ""}</td>
      <td>{post.isActive.toString()}</td>
      <td>
        <button className="OutPostTableRowEditBtn" onClick={onCrudPostClick}>
          edit
        </button>
      </td>
      <td>
        <button
          className="OutPostTableRowDecideBtn"
          onClick={onDecidePostClick}
        >
          share
        </button>
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
