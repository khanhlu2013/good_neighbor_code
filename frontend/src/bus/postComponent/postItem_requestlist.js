import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { date2String } from "../../share/util";

const Style = styled.div`
  margin-top: 10px;
`;

function PostItemRequestList(props) {
  const { shares } = props;
  const rows = shares
    .sort((s1, s2) => s1.dateCreate - s2.dateCreate)
    .map(share => (
      <tr key={share.id}>
        <td>{share.borrower.getNameAndEmail()}</td>
        <td>{date2String(share.dateCreate)}</td>
      </tr>
    ));

  return (
    <Style>
      <table className="my-table table-sm table-bordered table-striped">
        <thead className="thead-light">
          <tr className="thead-">
            <th>request</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </Style>
  );
}
PostItemRequestList.propTypes = {
  shares: PropTypes.array.isRequired
};

export default PostItemRequestList;
