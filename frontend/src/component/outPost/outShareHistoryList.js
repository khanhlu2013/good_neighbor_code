import React from "react";
import PropTypes from "prop-types";
import { date2String } from "../../util";
import "../shareHistoryList.css";
import { PostListNoData } from "../postListNoData";

function OutShareHistoryList(props) {
  const { shares } = props;
  const rows = shares.map(share => <TableRow key={share.id} share={share} />);
  if (shares.length === 0) {
    return <PostListNoData />;
  }

  return (
    <table
      id="OutShareReturnTable-react"
      className="table table-sm table-striped table-bordered shadow-box share-history-list"
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

OutShareHistoryList.propTypes = {
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

export { OutShareHistoryList };
