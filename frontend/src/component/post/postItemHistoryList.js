import React from "react";
import PropTypes from "prop-types";

import { date2String } from "../../util";
import "./postItemHistoryList.css";

function PostItemHistoryList(props) {
  const { shares } = props;
  const rows = shares
    .sort((s1, s2) => s2.dateReturn - s1.dateReturn)
    .map(share => (
      <tr key={share.id}>
        <td>{share.borrower.name}</td>
        <td>{share.borrower.email}</td>
        <td>{date2String(share.dateReturn)}</td>
      </tr>
    ));

  return (
    <table className="table table-sm table-bordered table-striped shadow-box post-item-history-list">
      <thead className="thead-light">
        <tr className="thead-">
          <th>history</th>
          <th>email</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
PostItemHistoryList.propTypes = {
  shares: PropTypes.array.isRequired
};

export { PostItemHistoryList };
