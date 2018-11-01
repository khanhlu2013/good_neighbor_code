import styled, { css } from "styled-components";

export const ShadowBoxMixin = css`
  border: 1px solid lightgrey;
  border-bottom: 0px;
  border-right: 0px;
  box-shadow: 1px 2px 3px grey;
`;

const ShadowBoxStyle = styled.div`
  ${ShadowBoxMixin};
`;
export default ShadowBoxStyle;
