import React from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 57px;
  background-color: antiquewhite;
  min-width: 420px;
`;
const CenterWrap = styled.div`
  display: flex;
  height: 100%;
  max-width: 700px;
  min-width: 420px;
  margin: 0 auto;
  padding: 0 10px;
`;

function AppBodyBannerStyle(props) {
  return (
    <Background>
      <CenterWrap>{props.children}</CenterWrap>
    </Background>
  );
}
export { AppBodyBannerStyle };
