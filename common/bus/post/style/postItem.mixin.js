import styled, { css } from "styled-components";
import ShadowBoxMixin from "../../../style/shadowBox.mixin";

const PostItemMixin = css`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  ${ShadowBoxMixin};
`;
export default PostItemMixin;
