import React from "react";
import styled from "styled-components";
import { AppCenterWrapMixin } from "./appCenterWrap_style";
import { BannerMixin } from "./banner_mixin";

const Banner = styled.div`
  ${BannerMixin} background-color: antiquewhite;
`;
const CenterWrap = styled.div`
  display: flex;
  height: 100%;
  ${AppCenterWrapMixin};
`;

function AppBodyBannerStyle(props) {
  return (
    <Banner>
      <CenterWrap>{props.children}</CenterWrap>
    </Banner>
  );
}
export { AppBodyBannerStyle };
