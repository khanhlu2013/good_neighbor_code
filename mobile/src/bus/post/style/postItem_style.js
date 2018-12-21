import React from "react";
import { Card } from "native-base";
import styled from "styled-components";

const Padding = styled.View`
  padding: 5px;
`;
const PostItemStyle = props => (
  <Card>
    <Padding>{props.children}</Padding>
  </Card>
);
export default PostItemStyle;
