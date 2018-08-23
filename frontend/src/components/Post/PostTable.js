import React from "react";
import PropTypes from "prop-types";

function PostTable(props) {
  const postRows = props.posts.map(post => {
    return (
      <tr key={post._id}>
        <td>{post.title}</td>
        <td>{post.description}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Post title</th>
          <th>Post description</th>
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
