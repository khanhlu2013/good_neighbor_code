import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Style = styled.div`
  background-color: ${props => (props.isImportant ? "red" : "peru")};
  color: white;
  border-radius: 5px 5px;
  padding: 1px 3px;
  line-height: 100%;
`;

function AlertItem(props) {
  const { count, isImportant = true } = props;

  let html;
  if (count === 0) {
    html = null;
  } else {
    html = <Style isImportant={isImportant}>{count}</Style>;
  }
  return html;
}
AlertItem.propTypes = {
  count: PropTypes.number.isRequired,
  isImportant: PropTypes.bool.isRequired
};

export default AlertItem;
