import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fromClass = "col-2";
const titleClass = "col-5";
const returnClass = "text-center col-1";
const deniedClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-2";

function InShareReturnTable(props) {
  const { shares } = props;
  const rows = shares.map(share => (
    <InShareReturnTableRow key={share.id} share={share} />
  ));

  return (
    <table
      id="InShareReturnTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={fromClass}>Return log</th>
          <th className={titleClass}>title</th>
          <th className={returnClass}>
            <FontAwesomeIcon icon="recycle" />
          </th>
          <th className={deniedClass}>
            <FontAwesomeIcon icon="thumbs-down" />
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

InShareReturnTable.propTypes = {
  shares: PropTypes.array.isRequired
};

function InShareReturnTableRow(props) {
  const { share } = props;
  const { post } = share;

  const borrowShare = post.borrow;
  const borrower = borrowShare ? borrowShare.borrower : null;
  return (
    <tr className="InShareReturnTableRow">
      <td className={fromClass}>{post.user.email}</td>
      <td className={titleClass}>{post.title}</td>
      <td className={returnClass}>{post.return.length}</td>
      <td className={deniedClass}>{post.denied.length}</td>
      <td className={requestClass}>{post.request.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
    </tr>
  );
}
InShareReturnTableRow.propTypes = {
  share: PropTypes.object.isRequired
};

export { InShareReturnTable };
