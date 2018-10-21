import React from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 57px;
  background-color: antiquewhite;
  min-width: 420px;
`;
const CenterWrap = styled.div`
  height: 100%;
  max-width: 700px;
  min-width: 420px;
  margin: 0 auto;
  padding: 0 10px;
`;
const Gravity = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`;
const Room = styled.div`
  flex-grow: 1;
`; //since gravity have align-items:flex-end, it must be display of flex which squeeze items, i need a room that have flex-grow to contain stuff in it.

function AppBodyBanner(props) {
  return (
    <Background>
      <CenterWrap>
        <Gravity>
          <Room>{props.children}</Room>
        </Gravity>
      </CenterWrap>
    </Background>
  );
}
export { AppBodyBanner };
