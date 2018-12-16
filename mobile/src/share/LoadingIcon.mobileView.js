import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

function LoadingIconMobileView(props) {
  const { text } = props;
  return (
    <View>
      <Text>{text}</Text>
      <ActivityIndicator />
    </View>
  );
}
LoadingIconMobileView.propTypes = {
  text: PropTypes.string.isRequired
};

export default LoadingIconMobileView;
