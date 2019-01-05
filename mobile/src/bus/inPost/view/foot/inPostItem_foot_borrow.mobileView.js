import React from "react";
import styled from "styled-components";
import { Button, Text, View } from "react-native";
import InPostItemFootBorrowViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot_borrow.view.propType";
import LoadingIconMobileView from "../../../../share/LoadingIcon.mobileView";

const Style = styled.View`
  flex-direction: row;
  align-items: center;
`;
function InPostItemFootBorrowMobileView(props) {
  const {
    myBorrowShareId,
    isAwareApproveBorrowShare,
    isAwaringShare,
    isReturningShare,
    onAwareApprovePost,
    onReturnPost
  } = props;

  const onAwareApprovePostClick = e => {
    onAwareApprovePost(myBorrowShareId);
  };
  const onReturnPostClick = e => {
    // this confirm need to be handle in unit test with jest, thus i am delay this
    // if (
    //   !window.confirm(`You are returning '${postTitle}'. This can not be undo!`)
    // ) {
    //   return;
    // }
    onReturnPost(myBorrowShareId);
  };

  let awareContent;
  if (!isAwareApproveBorrowShare) {
    if (isAwaringShare) {
      awareContent = <LoadingIconMobileView text={"aware approve"} />;
    } else {
      awareContent = (
        <Button title="confirm approved" onPress={onAwareApprovePostClick} />
      );
    }
  } else {
    awareContent = <Text>You've received.</Text>;
  }
  let returnContent;
  if (isReturningShare) {
    returnContent = <LoadingIconMobileView text={"return"} />;
  } else {
    returnContent = <Button title="return item" onPress={onReturnPostClick} />;
  }
  return (
    <Style>
      <Text>request approved.</Text>
      <View>{awareContent}</View>
      {returnContent}
    </Style>
  );
}

InPostItemFootBorrowMobileView.propTypes = InPostItemFootBorrowViewPropType;
export default InPostItemFootBorrowMobileView;
