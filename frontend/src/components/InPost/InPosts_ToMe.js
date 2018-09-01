import React from "react";
import PropTypes from "prop-types";

function InPostsToMe(props) {
  const { shares, onDeleteRequestingShareCb } = props;
  const requestingShares = shares.filter(
    share =>
      share.isApprovedByFrom === undefined && share.isReturnedByTo === false
  );

  return (
    <div id="InPostsToMe-react">
      <InPostsToMeRequestingTable
        requestingShares={requestingShares}
        onDeleteRequestingShareCb={onDeleteRequestingShareCb}
      />
    </div>
  );
}
InPostsToMe.propTypes = {
  shares: PropTypes.array.isRequired
};

function InPostsToMeRequestingTable(props) {
  const { requestingShares, onDeleteRequestingShareCb } = props;
  const rows = requestingShares.map(share => (
    <InPostsToMeRequestingTableRow
      key={share.id}
      requestingShare={share}
      onDeleteRequestingShareCb={onDeleteRequestingShareCb}
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
          <th>undo</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InPostsToMeRequestingTable.propTypes = {
  requestingShares: PropTypes.array.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

function InPostsToMeRequestingTableRow(props) {
  const { onDeleteRequestingShareCb, requestingShare } = props;
  const { post } = requestingShare;

  const onDeleteRequestingShare = e => {
    onDeleteRequestingShareCb(requestingShare.id);
  };

  return (
    <tr>
      <td>{post.user.email}</td>
      <td>{post.title}</td>
      <td>{post.description}</td>
      <td>{post.borrowed.length}</td>
      <td>{post.rejected.length}</td>
      <td>me + {post.requesting.length - 1}</td>
      <td>
        <button onClick={onDeleteRequestingShare}>undo</button>
      </td>
    </tr>
  );
}
InPostsToMeRequestingTableRow.propTypes = {
  requestingShare: PropTypes.object.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired
};

export { InPostsToMe };
