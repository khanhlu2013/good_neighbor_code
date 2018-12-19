import React from "react";
import styled from "styled-components";
import { AppCenterWrapMixin } from "./appCenterWrap_style";
import BannerMixin from "../mixin/banner.webMixin";

const Banner = styled.div`
  ${BannerMixin} background-color: antiquewhite;
`;
const CenterWrap = styled.div`
  display: flex;
  height: 100%;
  ${AppCenterWrapMixin};
`;

function AppBanner(props) {
  return (
    <Banner>
      <CenterWrap>{props.children}</CenterWrap>
    </Banner>
  );
}
export default AppBanner;
