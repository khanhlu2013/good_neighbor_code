import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";

const Style = styled.View`
  background-color: ${props => (props.isImportant ? "red" : "peru")};
  color: white;
  border-radius: 5;
  padding: 1px 3px;
  line-height: 100;
`;

function AlertItemMobileView(props) {
  const { count, isImportant = true } = props;

  let html;
  if (count === 0) {
    html = null;
  } else {
    html = (
      <Style isImportant={isImportant}>
        <Text style={{ color: "white" }}>{count}</Text>
      </Style>
    );
  }
  return html;
}
AlertItemMobileView.propTypes = {
  count: PropTypes.number.isRequired,
  isImportant: PropTypes.bool.isRequired
};

export default AlertItemMobileView;
