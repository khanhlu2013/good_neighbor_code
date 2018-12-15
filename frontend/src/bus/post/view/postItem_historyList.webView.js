import React from "react";
import PropTypes from "prop-types";
import { date2String } from "@gn/common/util";

function PostItemHistoryListWebView(props) {
  const { shares } = props;
  const rows = shares.map(share => (
    <tr key={share.id}>
      <td>{share.borrower.getNameAndEmail()}</td>
      <td>{date2String(share.dateReturn)}</td>
    </tr>
  ));

  return (
    <table className="my-table table-sm table-bordered table-striped">
      <thead className="thead-light">
        <tr>
          <th>history</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
PostItemHistoryListWebView.propTypes = {
  shares: PropTypes.array.isRequired
};

export default PostItemHistoryListWebView;
