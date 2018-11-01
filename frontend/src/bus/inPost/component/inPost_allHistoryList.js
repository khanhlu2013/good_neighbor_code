import React from "react";
import PropTypes from "prop-types";

import PostListNoData from "../../postComponent/postListNoData";
import PostAllHistoryListStyle from "../../postComponent/style/postAll_historyList_style";
import { date2String } from "../../../share/util";

function InPostAllHistoryList(props) {
  const { shares } = props;
  if (shares.length === 0) {
    return <PostListNoData />;
  }

  const rows = shares
    .sort((s1, s2) => s2.dateReturn - s1.dateReturn)
    .map(share => <TableRow key={share.id} share={share} />);

  return (
    <PostAllHistoryListStyle>
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
      </table>{" "}
    </PostAllHistoryListStyle>
  );
}

InPostAllHistoryList.propTypes = {
  shares: PropTypes.array.isRequired
};

function TableRow(props) {
  const { share } = props;
  const { post } = share;

  return (
    <tr className="InShareReturnTableRow">
      <td>{date2String(share.dateReturn)}</td>
      <td>{post.title}</td>
      <td>{post.user.getNameAndEmail()}</td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { InPostAllHistoryList };
