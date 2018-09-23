import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { date2String } from "../../util";

const dateClass = "";
const titleClass = "";
const fromNameClass = "";
const recycleClass = "text-center";
const requestClass = "text-center";
const borrowClass = "text-center";

function Table(props) {
  const { shares } = props;
  const rows = shares
    .sort((s1, s2) => s2.dateReturn - s1.dateReturn)
    .map(share => <TableRow key={share.id} share={share} />);

  return (
    <table
      id="InShareReturnTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={dateClass}>return</th>
          <th className={titleClass}>post</th>
          <th className={fromNameClass}>from</th>
          <th className={recycleClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={requestClass}>
            <FontAwesomeIcon icon="question" />
          </th>
          <th className={borrowClass}>borrower</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

Table.propTypes = {
  shares: PropTypes.array.isRequired
};

function TableRow(props) {
  const { share } = props;
  const { post } = share;

  const borrowShare = post.curBorrowShare;
  const borrower = borrowShare ? borrowShare.borrower : null;
  return (
    <tr className="InShareReturnTableRow">
      <td className={dateClass}>{date2String(share.dateReturn)}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={fromNameClass}>{post.user.name}</td>
      <td className={recycleClass}>{post.returnShares.length}</td>
      <td className={requestClass}>{post.requestShares.length}</td>
      <td className={borrowClass}>{borrower ? borrower.name : ""}</td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { Table as InShareReturnTable };
