import React from "react";
import styled from "styled-components";

import { AppShrinkWrap } from "./appShrinkWrap";

const AppBodyBannerContainer = styled.div`
  background-color: antiquewhite;
  min-width: 420px;
  display: flex;
  align-items: flex-end;
  height: 57px;
`;

function AppBodyBanner(props) {
  return (
    <AppBodyBannerContainer>
      <AppShrinkWrap>{props.children}</AppShrinkWrap>
    </AppBodyBannerContainer>
  );
}
export { AppBodyBanner };
