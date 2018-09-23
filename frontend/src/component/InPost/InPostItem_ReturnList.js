import React from "react";
import PropTypes from "prop-types";

function InPostItemReturnList(props) {
  const { shares } = props;
  const rows = shares.map(share => (
    <tr key={share.id}>
      <td>{share.borrower.name}</td>
      <td>{share.borrower.email}</td>
    </tr>
  ));

  return (
    <table className="table table-bordered table-striped">
      <thead className="thead-light">
        <tr className="thead-">
          <th>borrowed history</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
InPostItemReturnList.propTypes = {
  shares: PropTypes.array.isRequired
};

export { InPostItemReturnList };
