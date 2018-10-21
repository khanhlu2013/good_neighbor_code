import React from "react";
import styled from "styled-components";
import { ShadowBoxMixin } from "../../componentUi/mixin";

const Style = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  color: darkgrey;
  text-align: center;
  margin-top: 10px;
  background-color: white;
  padding: 10px;
  ${ShadowBoxMixin};
`;

function PostListNoData(props) {
  return <Style>there are no data</Style>;
}

export { PostListNoData };
