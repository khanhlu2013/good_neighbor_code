import React from "react";
import styled from "styled-components";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import InPostListMobileView from "./inPostList.mobileView";
import InPostManagementPropType from "../../../common/bus/inPost/propType/inPostManagement.propType";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";

const LoadingStyle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
function InPostManagementMobileView(props) {
  const {
    posts,
    isFetchingPosts,
    isInitPosts,
    requestPosts,
    borrowPosts,
    approveAlertPosts,
    returnShares
  } = props;
  const nav = createBottomTabNavigator({
    all: {
      screen: props => (
        <InPostListMobileView listId="blahblahID" posts={posts} />
      )
    },
    request: {
      screen: props => (
        <InPostListMobileView listId="blahblahID" posts={requestPosts} />
      )
    },
    approve: {
      screen: props => (
        <InPostListMobileView listId="blahblahID" posts={approveAlertPosts} />
      )
    },
    borrow: {
      screen: props => (
        <InPostListMobileView listId="blahblahID" posts={borrowPosts} />
      )
    }
  });

  const container = createAppContainer(nav);
  let content;
  if (!isInitPosts || isFetchingPosts) {
    content = (
      <LoadingStyle>
        <LoadingIconMobileView text="loading post" size="large" />
      </LoadingStyle>
    );
  } else {
    content = React.createElement(container, {});
  }
  return content;
}
InPostManagementMobileView.propTypes = InPostManagementPropType;

export default InPostManagementMobileView;
