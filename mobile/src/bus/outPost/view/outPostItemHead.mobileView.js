import React from "react";
import { Button, Text } from "native-base";
import styled from "styled-components";

import { date2String } from "../../../common/util";
import OutPostItemHeadPropType from "../../../common/bus/outPost/propType/outPostItemHead.propType";

const Style = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftStyle = styled.View`
  flex-grow: 1;
`;

function OutPostItemHeadMobileView(props) {
  const { postId, dateCreate, onUpdatePostClick } = props;

  return (
    <Style>
      <LeftStyle>
        <Button small onPress={() => onUpdatePostClick(postId)}>
          <Text>edit post</Text>
        </Button>
      </LeftStyle>

      <Text>{`post on: ${date2String(dateCreate)}`}</Text>
    </Style>
  );
}

OutPostItemHeadMobileView.propTypes = OutPostItemHeadPropType;

export default OutPostItemHeadMobileView;
