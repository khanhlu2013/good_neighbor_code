import { css } from "styled-components";
import { AppMinWidthMixin } from "./app.mixin";

const BannerMixin = css`
  ${AppMinWidthMixin};
  height: 57px;
`;

export default BannerMixin;
