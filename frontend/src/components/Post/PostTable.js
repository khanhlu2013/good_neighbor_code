import React from "react";
import PropTypes from "prop-types";

function PostTable(props) {
  const postRows = props.posts.map(post => {
    return (
      <tr key={post._id}>
        <td>{post.title}</td>
        <td>{post.description}</td>
        <td>{post.dateCreated}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date created</th>
        </tr>
      </thead>
      <tbody>{postRows}</tbody>
    </table>
  );
}
PostTable.propTypes = {
  posts: PropTypes.array.isRequired
};

export { PostTable };
