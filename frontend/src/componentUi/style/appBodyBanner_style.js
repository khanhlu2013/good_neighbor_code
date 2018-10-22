import React from "react";
import styled from "styled-components";
import { AppCenterWrapMixin } from "./appCenterWrap_style";

const Background = styled.div`
  height: 57px;
  background-color: antiquewhite;
  min-width: 420px;
`;
const CenterWrap = styled.div`
  display: flex;
  height: 100%;
  ${AppCenterWrapMixin};
`;

function AppBodyBannerStyle(props) {
  return (
    <Background>
      <CenterWrap>{props.children}</CenterWrap>
    </Background>
  );
}
export { AppBodyBannerStyle };
