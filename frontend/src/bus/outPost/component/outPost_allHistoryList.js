import React from "react";
import PropTypes from "prop-types";

import PostListNoData from "../../post/component/postListNoData";
import PostAllHistoryListStyle from "../../post/component/style/postAll_historyList_style";
import { date2String } from "../../../share/util";

function OutPostAllHistoryList(props) {
  const { shares } = props;
  const rows = shares.map(share => <TableRow key={share.id} share={share} />);
  if (shares.length === 0) {
    return <PostListNoData />;
  }

  return (
    <PostAllHistoryListStyle>
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
    </PostAllHistoryListStyle>
  );
}

OutPostAllHistoryList.propTypes = {
  shares: PropTypes.array.isRequired
};

function TableRow(props) {
  const { share } = props;
  const { post } = share;

  return (
    <tr className="OutShareReturnTableRow">
      <td>{date2String(share.dateReturn)}</td>
      <td>{post.title}</td>
      <td>{share.borrower.getNameAndEmail()}</td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export default OutPostAllHistoryList;
