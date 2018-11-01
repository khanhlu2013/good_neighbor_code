import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { date2String } from "../../share/util";

const Style = styled.div`
  margin-top: 10px;
`;

function PostItemHistoryList(props) {
  const { shares } = props;
  const rows = shares
    .sort((s1, s2) => s2.dateReturn - s1.dateReturn)
    .map(share => (
      <tr key={share.id}>
        <td>{share.borrower.getNameAndEmail()}</td>
        <td>{date2String(share.dateReturn)}</td>
      </tr>
    ));

  return (
    <Style>
      <table className="my-table table-sm table-bordered table-striped">
        <thead className="thead-light">
          <tr>
            <th>history</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </Style>
  );
}
PostItemHistoryList.propTypes = {
  shares: PropTypes.array.isRequired
};

export default PostItemHistoryList;
