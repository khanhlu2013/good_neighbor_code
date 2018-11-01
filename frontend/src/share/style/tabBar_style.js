import styled, { css } from "styled-components";

const TabBarMixin = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AppHeaderTabBarStyle = styled.div`
  ${TabBarMixin};
`;

const AppBodyTabBarStyle = styled.div`
  ${TabBarMixin};
  flex-grow: 1;
`;

export { AppHeaderTabBarStyle, AppBodyTabBarStyle };
