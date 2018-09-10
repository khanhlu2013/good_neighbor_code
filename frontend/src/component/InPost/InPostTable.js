import React from "react";
import PropTypes from "prop-types";

function InPostTable(props) {
  const { inPosts, onCreateRequestingShareCb, loginUser } = props;
  const rows = inPosts.map(inPost => (
    <InPostTableRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
      onCreateRequestingShareCb={onCreateRequestingShareCb}
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
          <th>denied</th>
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
  inPosts: PropTypes.array.isRequired,
  onCreateRequestingShareCb: PropTypes.func.isRequired
};

function InPostTableRow(props) {
  const { loginUser, inPost, onCreateRequestingShareCb } = props;
  const onCreateShare = e => {
    onCreateRequestingShareCb(inPost.id);
  };
  const isRequesting = inPost.isRequestingBy(loginUser.id);
  const borrowingShare = inPost.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;
  return (
    <tr className="InPostTableRow">
      <td>{inPost.user.email}</td>
      <td>{inPost.title}</td>
      <td>{inPost.description}</td>
      <td>{inPost.borrowed.length}</td>
      <td>{inPost.denied.length}</td>
      <td>{inPost.requesting.length}</td>
      <td>{borrower ? borrower.email : ""}</td>
      <td>
        {isRequesting && "requesting ..."}
        {!isRequesting && (
          <button className="InPostTableRowBorrowBtn" onClick={onCreateShare}>
            request
          </button>
        )}
      </td>
    </tr>
  );
}
InPostTableRow.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPost: PropTypes.object.isRequired,
  onCreateRequestingShareCb: PropTypes.func.isRequired
};

export { InPostTable };
