import styled, { css } from "styled-components";
import { AppMinWidthMixin, AppMaxWidthMixin } from "./app_mixin";

const AppCenterWrapMixin = css`
  ${AppMinWidthMixin} ${AppMaxWidthMixin}
  margin: 0 auto;
  padding: 0 10px;
`;

const AppCenterWrapStyle = styled.div`
  ${AppCenterWrapMixin};
`;

export { AppCenterWrapStyle, AppCenterWrapMixin };
