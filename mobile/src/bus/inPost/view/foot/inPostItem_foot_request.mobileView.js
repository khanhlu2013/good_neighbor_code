import React from "react";
import styled from "styled-components";
import { Text, Button, View } from "react-native";
import LoadingIconMobileView from "../../../../share/LoadingIcon.mobileView";
import InPostItemFootRequestViewPropType from "../../../../common/bus/inPost/propType/foot/inPostItem_foot_request.view.propType";

const Style = styled.View`
  flex-direction: row;
  align-items: center;
`;
function InPostItemFootRequestMobileView(props) {
  const { myRequestShareId, isUnRequestingPost, onUnRequestPost } = props;

  const handleUndoRequest = e => {
    onUnRequestPost(myRequestShareId);
  };

  let content;
  if (isUnRequestingPost) {
    content = <LoadingIconMobileView text="undo" />;
  } else {
    content = (
      <Button
        title="undo"
        id="outPostItem-undoRequestBtn-react"
        onPress={handleUndoRequest}
      />
    );
  }

  return (
    <Style>
      <Text>you're in the waiting list.</Text>
      {content}
    </Style>
  );
}

InPostItemFootRequestMobileView.propTypes = InPostItemFootRequestViewPropType;

export default InPostItemFootRequestMobileView;
