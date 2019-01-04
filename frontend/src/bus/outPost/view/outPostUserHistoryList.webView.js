import React from "react";
import PropTypes from "prop-types";

import PostListNoDataWebView from "../../post/view/postListNoData.webView";
import Share from "@gn/common/model/share";
import OutPostUserHistoryListPropType from "@gn/common/bus/outPost/propType/outPostUserHistoryList.propTypes";
import { date2String } from "@gn/common/util";

function OutPostUserHistoryListWebView(props) {
  const { shares } = props;
  const rows = shares.map(share => <TableRow key={share.id} share={share} />);
  if (shares.length === 0) {
    return <PostListNoDataWebView />;
  }

  return (
    <table
      id="OutShareReturnTable-react"
      className="table table-sm table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th>date</th>
          <th>post</th>
          <th>borrower</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

OutPostUserHistoryListWebView.propTypes = OutPostUserHistoryListPropType;

function TableRow(props) {
  const { share } = props;
  const { post } = share;

  return (
    <tr>
      <td>{date2String(share.dateReturn)}</td>
      <td>{post.title}</td>
      <td>{share.borrower.getNameAndEmail()}</td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.instanceOf(Share).isRequired
};

export default OutPostUserHistoryListWebView;
