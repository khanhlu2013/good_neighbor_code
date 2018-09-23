import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const titleClass = "col-6";
const fromClass = "col-2";
const recycleClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-2";

function Table(props) {
  const { shares } = props;
  const rows = shares.map(share => <TableRow key={share.id} share={share} />);

  return (
    <table
      id="InShareReturnTable-react"
      className="table table-sm table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={titleClass}>return</th>
          <th className={fromClass}>from</th>
          <th className={recycleClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={requestClass}>
            <FontAwesomeIcon icon="question" />
          </th>
          <th className={borrowClass}>
            <FontAwesomeIcon icon="user-clock" />
          </th>
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
      <td className={titleClass}>{post.title}</td>
      <td className={fromClass}>{post.user.email}</td>
      <td className={recycleClass}>{post.returnShares.length}</td>
      <td className={requestClass}>{post.requestShares.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
    </tr>
  );
}
TableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { Table as InShareReturnTable };
