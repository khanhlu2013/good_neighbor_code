import styled, { css } from "styled-components";

const AppCenterWrapMixin = css`
  max-width: 700px;
  min-width: 420px;
  margin: 0 auto;
  padding: 0 10px;
`;

const AppCenterWrapStyle = styled.div`
  ${AppCenterWrapMixin};
`;

export { AppCenterWrapStyle, AppCenterWrapMixin };
