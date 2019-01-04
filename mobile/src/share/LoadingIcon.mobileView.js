import React from "react";
import styled from "styled-components";
import { Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

const Styled = styled.View`
  flex-direction: row;
  align-items: center;
`;
function LoadingIconMobileView(props) {
  const { text } = props;
  return (
    <Styled>
      <Text>{text}</Text>
      <ActivityIndicator size="large" />
    </Styled>
  );
}
LoadingIconMobileView.propTypes = {
  text: PropTypes.string.isRequired
};

export default LoadingIconMobileView;
