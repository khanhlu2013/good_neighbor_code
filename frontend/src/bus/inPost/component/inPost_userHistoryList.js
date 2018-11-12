import React from "react";
import PropTypes from "prop-types";

import PostListNoData from "../../post/component/postListNoData";
import { date2String } from "../../../share/util";
import Share from "../../../model/share";

function InPostUserHistoryList(props) {
  const { shares } = props;
  if (shares.length === 0) {
    return <PostListNoData />;
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
