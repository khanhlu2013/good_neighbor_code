import React from "react";
import styled from "styled-components";
import PostListNoDataMixin from "@gn/common/bus/post/style/postListNoData.mixin";
import ShadowBoxMixin from "@gn/common/style/shadowBox.mixin";

const ContainerStyle = styled.div`
  ${PostListNoDataMixin}
`;

const TextStyle = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  color: darkgrey;
  text-align: center;
`;

function PostListNoDataWebView(props) {
  return (
    <ContainerStyle>
      <TextStyle>there are no data</TextStyle>
    </ContainerStyle>
  );
}

export default PostListNoDataWebView;
