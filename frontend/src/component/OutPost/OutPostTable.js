import React from "react";
import PropTypes from "prop-types";

function OutPostTable(props) {
  const { outPosts, onOpenOutPostEditDialogCb } = props;
  const postRows = outPosts.map(outPost => {
    return (
      <PostTableRow
        key={outPost.id}
        outPost={outPost}
        onOpenOutPostEditDialogCb={onOpenOutPostEditDialogCb}
      />
    );
  });
  return (
    <table id="OutPostTable-react">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>borrowed</th>
          <th>rejected</th>
          <th>requesting</th>
          <th>borrowing</th>
          <th>Is Active</th>
        </tr>
      </thead>
      <tbody>{postRows}</tbody>
    </table>
  );
}
OutPostTable.propTypes = {
  outPosts: PropTypes.array.isRequired,
  onOpenOutPostEditDialogCb: PropTypes.func.isRequired
};

function PostTableRow(props) {
  const { outPost, onOpenOutPostEditDialogCb } = props;

  const onCrudClick = () => {
    onOpenOutPostEditDialogCb(outPost);
  };

  return (
    <tr className="OutPostTableRow">
      <td>{outPost.title}</td>
      <td>{outPost.description}</td>
      <td>{outPost.borrowed.length}</td>
      <td>{outPost.rejected.length}</td>
      <td>{outPost.requesting.length}</td>
      <td>{outPost.borrowing}</td>
      <td>{outPost.isActive.toString()}</td>
      <td>
        <button className="OutPostTableRowEditBtn" onClick={onCrudClick}>
          edit
        </button>
      </td>
    </tr>
  );
}

PostTableRow.propsType = {
  outPost: PropTypes.object.isRequired,
  onOpenOutPostEditDialogCb: PropTypes.func.isRequired
};

export { OutPostTable };
