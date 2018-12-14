import React from "react";
import PostItemRequestListViewPropType from "@gn/common/bus/post/propType/postItem_requestList.view.propType";

import { date2String } from "@gn/common/util";

function PostItemRequestListWebView(props) {
  const { shares } = props;
  const rows = [...shares]
    .sort((s1, s2) => s1.dateCreate - s2.dateCreate)
    .map(share => (
      <tr key={share.id}>
        <td>{share.borrower.getNameAndEmail()}</td>
        <td>{date2String(share.dateCreate)}</td>
      </tr>
    ));

  return (
    <table className="my-table table-sm table-bordered table-striped">
      <thead className="thead-light">
        <tr className="thead-">
          <th>request</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
PostItemRequestListWebView.propTypes = PostItemRequestListViewPropType;

export default PostItemRequestListWebView;
