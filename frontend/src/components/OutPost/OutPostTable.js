import React from "react";
import PropTypes from "prop-types";

function OutPostTable(props) {
  const postRows = props.outPosts.map(post => {
    return (
      <tr key={post._id}>
        <td>{post.title}</td>
        <td>{post.description}</td>
        <td>{post.dateCreated}</td>
      </tr>
    );
  });
  return (
    <table id="OutPostTable-react">
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
OutPostTable.propTypes = {
  outPosts: PropTypes.array.isRequired
};

export { OutPostTable };
