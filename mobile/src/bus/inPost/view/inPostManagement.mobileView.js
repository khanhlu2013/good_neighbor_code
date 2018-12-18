import React from "react";
import { Text, View, Button } from "react";
import styled from "styled-components";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from "native-base";

import InPostListMobileView from "./inPostList.mobileView";
import InPostManagementPropType from "../../../common/bus/inPost/propType/inPostManagement.propType";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import InPostUserHistoryListController from "../../../common/bus/inPost/controller/inPost_userHistoryList.controller";
import InPostUserHistoryListMobileView from "./inPost_userHistoryList.mobileView";

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
  const nav = createBottomTabNavigator(
    {
      all: {
        screen: props => (
          <InPostListMobileView listId="blahblahID" posts={posts} />
        ),
        navigationOptions: {
          title: null,
          tabBarLabel: `all (${posts.length})`
          // tabBarLabel: <Text>abc</Text>
        }
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
      },
      history: {
        screen: props => (
          <InPostUserHistoryListController
            shares={returnShares}
            view={InPostUserHistoryListMobileView}
          />
        )
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          let iconProvider;
          let caption;
          switch (routeName) {
            case "all":
              iconName = "ios-globe";
              iconProvider = "Ionicons";
              caption = "all friend posts";
              break;
            case "request":
              iconName = "question";
              iconProvider = "FontAwesome";
              caption = "request";
              break;
            case "approve":
              iconName = "check";
              iconProvider = "FontAwesome";
              caption = "approve alert";
              break;
            case "borrow":
              iconName = "slideshare";
              iconProvider = "Entypo";
              caption = "borrow";
              break;
            case "history":
              iconName = "history";
              iconProvider = "FontAwesome";
              caption = "history";
              break;
            default:
              iconName = "cancel";
              iconProvider = "MaterialCommunityIcons";
              caption = null;
              break;
          }
          return (
            <Icon
              name={iconName}
              type={iconProvider}
              style={{ fontSize: 27, color: tintColor }}
            />
          );
        }
      }),
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: true
      }
    }
  );

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
