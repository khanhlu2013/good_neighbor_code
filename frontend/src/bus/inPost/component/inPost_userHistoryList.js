import React from "react";
import PropTypes from "prop-types";

import PostListNoDataWebView from "../../post/view/postListNoData.webView";
import { date2String } from "@gn/common/util";
import Share from "@gn/common/model/share";

function InPostUserHistoryList(props) {
  const { shares } = props;
  if (shares.length === 0) {
    return <PostListNoDataWebView />;
  }

  const rows = shares
    .sort((s1, s2) => s2.dateReturn - s1.dateReturn)
    .map(share => {
      const { post } = share;
      return (
        <tr key={share.id}>
          <td>{date2String(share.dateReturn)}</td>
          <td>{post.title}</td>
          <td>{post.user.getNameAndEmail()}</td>
        </tr>
      );
    });

  return (
    <table
      id="InShareReturnTable-react"
      className="table table-sm table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th>date</th>
          <th>post</th>
          <th>lender</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

InPostUserHistoryList.propTypes = {
  shares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired
};

export default InPostUserHistoryList;
