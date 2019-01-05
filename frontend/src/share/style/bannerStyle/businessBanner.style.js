import React from "react";
import styled from "styled-components";
import WebBannerMixin from "./webBanner.mixin";
import { AppCenterWrapMixin } from "../appCenterWrap_style";
import BusinessBannerMixin from "@gn/common/style/businessBanner.mixin";

const Style = styled.div`
  ${WebBannerMixin} ${BusinessBannerMixin};
`;
const CenterWrap = styled.div`
  display: flex;
  height: 100%;
  ${AppCenterWrapMixin};
`;

function BusinessBannerStyle(props) {
  return (
    <Style>
      <CenterWrap>{props.children}</CenterWrap>
    </Style>
  );
}
export default BusinessBannerStyle;
