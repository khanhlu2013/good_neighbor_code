import React from "react";
import styled from "styled-components";

import { AppShrinkWrap } from "./appShrinkWrap";

const AppBodyBannerBackground = styled.div`
  background-color: antiquewhite;
  min-width: 420px;
  display: flex;
  height: 57px;
`;

function AppBodyBanner(props) {
  return (
    <AppBodyBannerBackground>
      <AppShrinkWrap>{props.children}</AppShrinkWrap>
    </AppBodyBannerBackground>
  );
}
export { AppBodyBanner };
