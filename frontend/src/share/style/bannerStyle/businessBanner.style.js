import React from "react";
import styled from "styled-components";
import BannerMixin from "./banner.mixin";
import { AppCenterWrapMixin } from "../appCenterWrap_style";

const Banner = styled.div`
  ${BannerMixin} background-color: antiquewhite;
`;
const CenterWrap = styled.div`
  display: flex;
  height: 100%;
  ${AppCenterWrapMixin};
`;

function BusinessBannerStyle(props) {
  return (
    <Banner>
      <CenterWrap>{props.children}</CenterWrap>
    </Banner>
  );
}
export default BusinessBannerStyle;
