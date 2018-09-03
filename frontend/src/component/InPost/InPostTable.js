import React from "react";
import PropTypes from "prop-types";

function InPostTable(props) {
  const { allInPosts, onCreateShareCb, loginUser } = props;
  const rows = allInPosts.map(inPost => (
    <InPostTableRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
      onCreateShareCb={onCreateShareCb}
    />
  ));

  return (
    <table id="InPostTable-react">
      <thead>
        <tr>
          <th>From</th>
          <th>title</th>
          <th>description</th>
          <th>borrowed</th>
          <th>rejected</th>
          <th>requesting</th>
          <th>borrowing</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InPostTable.propTypes = {
  loginUser: PropTypes.object.isRequired,
  allInPosts: PropTypes.array.isRequired,
  onCreateShareCb: PropTypes.func.isRequired
};

function InPostTableRow(props) {
  const { loginUser, inPost, onCreateShareCb } = props;
  const onCreateShare = e => {
    onCreateShareCb(inPost.id);
  };
  const isRequesting = inPost.isRequestingBy(loginUser.id);
  return (
    <tr className="InPostTableRow">
      <td>{inPost.user.email}</td>
      <td>{inPost.title}</td>
      <td>{inPost.description}</td>
      <td>{inPost.borrowed.length}</td>
      <td>{inPost.rejected.length}</td>
      <td>{inPost.requesting.length}</td>
      <td>{inPost.borrowing}</td>
      <td>
        {isRequesting && "requesting ..."}
        {!isRequesting && (
          <button className="InPostTableRowBorrowBtn" onClick={onCreateShare}>
            borrow
          </button>
        )}
      </td>
    </tr>
  );
}
InPostTableRow.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPost: PropTypes.object.isRequired,
  onCreateShareCb: PropTypes.func.isRequired
};

export { InPostTable };
