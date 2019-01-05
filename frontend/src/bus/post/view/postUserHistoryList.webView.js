import React from "react";

import PostListNoDataWebView from "./postListNoData.webView";
import PostUserHistoryListPropType from "@gn/common/bus/post/propType/postUserHistoryList.propTypes";
import { date2String } from "@gn/common/util";

function PostUserHistoryListWebView(props) {
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
      <tbody>{rows}</tbody>
    </table>
  );
}

PostUserHistoryListWebView.propTypes = PostUserHistoryListPropType;

export default PostUserHistoryListWebView;
