import React from "react";
import PropTypes from "prop-types";

function InPostFromAll(props) {
  const { allInPosts, onCreateShareCb, loginUser } = props;
  const rows = allInPosts.map(inPost => (
    <InPostFromAllRow
      key={inPost.id}
      loginUser={loginUser}
      inPost={inPost}
      onCreateShareCb={onCreateShareCb}
    />
  ));

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
          <th>action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InPostFromAll.propTypes = {
  loginUser: PropTypes.object.isRequired,
  allInPosts: PropTypes.array.isRequired,
  onCreateShareCb: PropTypes.func.isRequired
};

function InPostFromAllRow(props) {
  const { loginUser, inPost, onCreateShareCb } = props;
  const onCreateShare = e => {
    onCreateShareCb(inPost.id);
  };
  const isRequesting = inPost.isRequestingBy(loginUser.id);
  return (
    <tr>
      <td>{inPost.user.email}</td>
      <td>{inPost.title}</td>
      <td>{inPost.description}</td>
      <td>{inPost.borrowed.length}</td>
      <td>{inPost.rejected.length}</td>
      <td>{inPost.requesting.length}</td>
      <td>{inPost.borrowing}</td>
      <td>
        {isRequesting && "requesting ..."}
        {!isRequesting && <button onClick={onCreateShare}>borrow</button>}
      </td>
    </tr>
  );
}
InPostFromAllRow.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPost: PropTypes.object.isRequired,
  onCreateShareCb: PropTypes.func.isRequired
};

export { InPostFromAll };
