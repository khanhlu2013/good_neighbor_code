import React from "react";
import PropTypes from "prop-types";

function OutPostTable(props) {
  const { posts, onOpenOutPostEditDialogCb } = props;
  const postRows = posts.map(post => {
    return (
      <PostTableRow
        key={post._id}
        post={post}
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
          <th>Is Active</th>
          <th>Date created</th>
        </tr>
      </thead>
      <tbody>{postRows}</tbody>
    </table>
  );
}
OutPostTable.propTypes = {
  posts: PropTypes.array.isRequired,
  onOpenOutPostEditDialogCb: PropTypes.func.isRequired
};

function PostTableRow(props) {
  const { post, onOpenOutPostEditDialogCb } = props;

  const onCrudClick = () => {
    onOpenOutPostEditDialogCb(post);
  };

  return (
    <tr>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.isActive.toString()}</td>
      <td>{post.dateCreated}</td>
      <td>
        <button onClick={onCrudClick}>edit</button>
      </td>
    </tr>
  );
}

PostTableRow.propsType = {
  post: PropTypes.object.isRequired,
  onOpenOutPostEditDialogCb: PropTypes.func.isRequired
};

export { OutPostTable };
