import React from "react";
import styled from "styled-components";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import InPostListMobileView from "./inPostList.mobileView";
import InPostManagementPropType from "../../../common/bus/inPost/propType/inPostManagement.propType";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import InPostUserHistoryListController from "../../../common/bus/inPost/controller/inPost_userHistoryList.controller";
import InPostUserHistoryListMobileView from "./inPost_userHistoryList.mobileView";
import { BUSINESS_ICON_SIZE } from "../../../share/uiConstant";
import TabItemMobileView from "../../../share/tabItem.mobileView";

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
          title: "all"
        }
      },
      request: {
        screen: props => (
          <InPostListMobileView listId="blahblahID" posts={requestPosts} />
        ),
        navigationOptions: {
          title: "request"
        }
      },
      approve: {
        screen: props => (
          <InPostListMobileView listId="blahblahID" posts={approveAlertPosts} />
        ),
        navigationOptions: {
          title: "approve"
        }
      },
      borrow: {
        screen: props => (
          <InPostListMobileView listId="blahblahID" posts={borrowPosts} />
        ),
        navigationOptions: {
          title: "borrow"
        }
      },
      history: {
        screen: props => (
          <InPostUserHistoryListController
            shares={returnShares}
            view={InPostUserHistoryListMobileView}
          />
        ),
        navigationOptions: {
          title: "history"
        }
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          let iconProvider;
          let count;
          let isImportant;

          switch (routeName) {
            case "all":
              iconName = "ios-globe";
              iconProvider = "Ionicons";
              count = posts.length;
              isImportant = false;
              break;
            case "request":
              iconName = "question";
              iconProvider = "FontAwesome";
              count = requestPosts.length;
              isImportant = false;
              break;
            case "approve":
              iconName = "check";
              iconProvider = "FontAwesome";
              count = approveAlertPosts.length;
              isImportant = true;
              break;
            case "borrow":
              iconName = "slideshare";
              iconProvider = "Entypo";
              count = borrowPosts.length;
              isImportant = false;
              break;
            case "history":
              iconName = "history";
              iconProvider = "FontAwesome";
              count = returnShares.length;
              isImportant = false;
              break;
            default:
              iconName = "cancel";
              iconProvider = "MaterialCommunityIcons";
              count = null;
              isImportant = null;
              break;
          }
          return (
            <TabItemMobileView
              iconName={iconName}
              iconProvider={iconProvider}
              iconSize={BUSINESS_ICON_SIZE}
              iconColor={tintColor}
              iconCount={count}
              iconCountIsImportant={isImportant}
            />
          );
        }
      }),
      tabBarOptions: {
        activeTintColor: "maroon",
        inactiveTintColor: "rgb(214, 174, 139)",
        showLabel: true,
        style: {
          backgroundColor: "antiquewhite"
        }
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
