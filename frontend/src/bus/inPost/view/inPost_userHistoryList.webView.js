import React from "react";

import PostListNoDataWebView from "../../post/view/postListNoData.webView";
import InPostUserHistoryListPropType from "@gn/common/bus/inPost/propType/inPost_userHistoryList.propType";
import { date2String } from "@gn/common/util";

function InPostUserHistoryListWebView(props) {
  const { shares } = props;
  if (shares.length === 0) {
    return <PostListNoDataWebView />;
  }

  const rows = shares.map(share => {
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

InPostUserHistoryListWebView.propTypes = InPostUserHistoryListPropType;

export default InPostUserHistoryListWebView;
