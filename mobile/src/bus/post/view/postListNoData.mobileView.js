import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import PostListNoDataMixin from "../../../common/bus/post/style/postListNoData.mixin";

const ContainerStyle = styled.View`
  ${PostListNoDataMixin}
`;

const TextStyle = styled.Text`
  font-size: 20;
  font-weight: 500;
  color: darkgrey;
  text-align: center;
`;

function PostListNoDataMobileView(props) {
  return (
    <ContainerStyle>
      <TextStyle>there is no data</TextStyle>
    </ContainerStyle>
  );
}

export default PostListNoDataMobileView;
