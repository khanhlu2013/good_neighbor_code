import React from "react";
import styled from "styled-components";
import { Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { nullOrRequiredValidator } from "../common/util";

const Styled = styled.View`
  flex-direction: row;
  align-items: center;
`;
function LoadingIconMobileView(props) {
  const { text, size = "small" } = props;
  return (
    <Styled>
      <Text>{text}</Text>
      <ActivityIndicator size={size} />
    </Styled>
  );
}
LoadingIconMobileView.propTypes = {
  text: PropTypes.string.isRequired,
  size: nullOrRequiredValidator("string")
};

export default LoadingIconMobileView;
