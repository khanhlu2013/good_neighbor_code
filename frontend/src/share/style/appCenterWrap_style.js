import styled, { css } from "styled-components";
import { AppMinWidthMixin, AppMaxWidthMixin } from "../mixin/app.mixin";

export const AppCenterWrapMixin = css`
  ${AppMinWidthMixin} ${AppMaxWidthMixin}
  margin: 0 auto;
  padding: 0 10px;
`;

const AppCenterWrapStyle = styled.div`
  ${AppCenterWrapMixin};
`;

export default AppCenterWrapStyle;
