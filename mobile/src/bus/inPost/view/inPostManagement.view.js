import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Constants } from "expo";
import styled from "styled-components/native";

const Style = styled.View`
  flex: 1;
  margin-top: ${Constants.statusBarHeight};
  align-items: center;
  justify-content: center;
`;

function InPostManagementWebView(props) {
  const { posts, isFetchingPosts, isInitPosts } = props;

  let content;
  if (!isInitPosts || isFetchingPosts) {
    content = <ActivityIndicator size="large" />;
  } else {
    const list = posts.map(post => (
      <View key={post.id}>
        <Text>{post.title}</Text>
      </View>
    ));
    content = <View>{list}</View>;
  }
  return <Style>{content}</Style>;
}
InPostManagementWebView.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  isInitPosts: PropTypes.bool.isRequired
};

export default InPostManagementWebView;
