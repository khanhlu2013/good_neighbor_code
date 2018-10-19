import React from "react";
import styled from "styled-components";

const BannerBackground = styled.div`
  height: 57px;
  background-color: antiquewhite;
  min-width: 420px;
  display: flex;
`;

const BannerWrap = styled.div`
  align-self: flex-end;
  max-width: 700px;
  min-width: 420px;
  margin: 0 auto;
  padding: 0 10px;
  flex-grow: 1;
`;

function AppBodyBanner(props) {
  return (
    <BannerBackground>
      <BannerWrap>{props.children}</BannerWrap>
    </BannerBackground>
  );
}
export { AppBodyBanner };
