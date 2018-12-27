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
import DUMMY_ID from "../../../share/dummyId";

const LoadingStyle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InPostManagementNavigator = createBottomTabNavigator(
  {
    all: {
      screen: props => (
        <InPostListMobileView
          listId={DUMMY_ID}
          posts={props.screenProps.posts}
        />
      ),
      navigationOptions: {
        title: "all"
      }
    },
    request: {
      screen: props => (
        <InPostListMobileView
          listId={DUMMY_ID}
          posts={props.screenProps.requestPosts}
        />
      ),
      navigationOptions: {
        title: "request"
      }
    },
    approve: {
      screen: props => (
        <InPostListMobileView
          listId={DUMMY_ID}
          posts={props.screenProps.approveAlertPosts}
        />
      ),
      navigationOptions: {
        title: "approve"
      }
    },
    borrow: {
      screen: props => (
        <InPostListMobileView
          listId={DUMMY_ID}
          posts={props.screenProps.borrowPosts}
        />
      ),
      navigationOptions: {
        title: "borrow"
      }
    },
    history: {
      screen: props => (
        <InPostUserHistoryListController
          shares={props.screenProps.returnShares}
          view={InPostUserHistoryListMobileView}
        />
      ),
      navigationOptions: {
        title: "history"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
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
            count = screenProps.posts.length;
            isImportant = false;
            break;
          case "request":
            iconName = "question";
            iconProvider = "FontAwesome";
            count = screenProps.requestPosts.length;
            isImportant = false;
            break;
          case "approve":
            iconName = "check";
            iconProvider = "FontAwesome";
            count = screenProps.approveAlertPosts.length;
            isImportant = true;
            break;
          case "borrow":
            iconName = "slideshare";
            iconProvider = "Entypo";
            count = screenProps.borrowPosts.length;
            isImportant = false;
            break;
          case "history":
            iconName = "history";
            iconProvider = "FontAwesome";
            count = screenProps.returnShares.length;
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
