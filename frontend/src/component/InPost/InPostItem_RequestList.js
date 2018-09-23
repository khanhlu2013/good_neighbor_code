import React from "react";
import PropTypes from "prop-types";
import { date2String } from "../../util";

function InPostItemRequestList(props) {
  const { shares } = props;
  const rows = shares
    .sort((s1, s2) => s1.dateCreated - s2.dateCreated)
    .map(share => (
      <tr key={share.id}>
        <td>{share.borrower.name}</td>
        <td>{share.borrower.email}</td>
        <td>{date2String(share.dateCreated)}</td>
      </tr>
    ));

  return (
    <table className="table table-bordered table-striped">
      <thead className="thead-light">
        <tr className="thead-">
          <th>waiting list</th>
          <th>email</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
InPostItemRequestList.propTypes = {
  shares: PropTypes.array.isRequired
};

export { InPostItemRequestList };
