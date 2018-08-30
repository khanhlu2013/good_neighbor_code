import React from "react";
import PropTypes from "prop-types";

function InPostTable(props) {
  const rows = props.inPosts.map((inPost, index) => {
    return (
      <tr key={index}>
        <td>{inPost.user.email}</td>
        <td>{inPost.title}</td>
        <td>{inPost.description}</td>
        <td>{inPost.borrowed.length}</td>
        <td>{inPost.rejected.length}</td>
        <td>{inPost.requesting.length}</td>
        <td>{inPost.borrowing}</td>
        <td>
          <button>borrow</button>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>From</th>
          <th>title</th>
          <th>description</th>
          <th>borrowed</th>
          <th>rejected</th>
          <th>requesting</th>
          <th>borrowing</th>
          <th>borrow</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
InPostTable.propTypes = {
  inPosts: PropTypes.array.isRequired
};

export { InPostTable };
