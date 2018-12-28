import React from "react";
import styled from "styled-components";

import InPostManagementPropType from "../../../common/bus/inPost/propType/inPostManagement.propType";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import InPostManagementNavigator from "../navigation/inPostManagement.navigation";

const LoadingStyle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function InPostManagementMobileView(props) {
  const {
    navigation,
    posts,
    isFetchingPosts,
    isInitPosts,
    requestPosts,
    borrowPosts,
    approveAlertPosts,
    returnShares
  } = props;

  let content;
  if (!isInitPosts || isFetchingPosts) {
    content = (
      <LoadingStyle>
        <LoadingIconMobileView text="loading post" size="large" />
      </LoadingStyle>
    );
  } else {
    content = (
      <InPostManagementNavigator
        navigation={navigation}
        screenProps={{
          posts,
          requestPosts,
          borrowPosts,
          approveAlertPosts,
          returnShares
        }}
      />
    );
  }
  return content;
}
InPostManagementMobileView.propTypes = InPostManagementPropType;

export default InPostManagementMobileView;
