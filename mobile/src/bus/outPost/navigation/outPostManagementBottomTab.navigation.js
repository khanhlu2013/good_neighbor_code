import React from "react";

import { createBottomTabNavigator } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { Button, Text, Icon } from "native-base";
import OutPostListController from "@gn/common/bus/outPost/controller/outPostList.controller";
import DUMMY_ID from "../../../share/dummyId";
import OutPostListMobileView from "../view/outPostList.mobileView";
import PostUserHistoryListMobileView from "../../post/view/postUserHistoryList.mobileView";
import TabItemMobileView from "../../../share/tabItem.mobileView";
import { BUSINESS_ICON_SIZE } from "../../../share/uiConstant";

function screenFactory(routeTitle, postListKeyFromScreenProps) {
  return {
    screen: props => {
      const { screenProps } = props;

      const postList = screenProps[postListKeyFromScreenProps];
      return (
        <OutPostListController
          view={OutPostListMobileView}
          listId={DUMMY_ID}
          posts={postList}
          awaringReturnPostIds={screenProps.awaringReturnPostIds}
          onUpdatePostClick={screenProps.onUpdatePostClick}
          onDecidePostClick={screenProps.onDecidePostClick}
          onAwareReturnPost={screenProps.onAwareReturnPost}
        />
      );
    },
    navigationOptions: {
      title: routeTitle
    }
  };
}

const OutPostManagementBottomTabNavigator = createBottomTabNavigator(
  {
    outPost_all: screenFactory("all", "posts"),
    outPost_request: screenFactory("request", "requestAlertPosts"),
    outPost_borrow: screenFactory("borrow", "borrowPosts"),
    outPost_return: screenFactory("return", "returnAlertPosts"),
    outPost_history: {
      screen: props => {
        const { screenProps } = props;
        const { returnShares } = screenProps;

        return <PostUserHistoryListMobileView shares={returnShares} />;
      },
      navigationOptions: {
        title: "history"
      }
    },
    outPost_createPost: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarButtonComponent: () => (
          <View
            style={{
              flex: 1
            }}
          >
            <Button
              style={{ alignSelf: "center", marginTop: 8 }}
              small
              success
              onPress={() => {
                navigation.navigate("outPost_crudDialog", {});
              }}
            >
              <Icon name="ios-add" type="Ionicons" />
            </Button>
          </View>
        )
      })
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
          case "outPost_all":
            iconName = "briefcase";
            iconProvider = "FontAwesome";
            count = screenProps.posts.length;
            isImportant = false;
            break;
          case "outPost_request":
            iconName = "question";
            iconProvider = "FontAwesome";
            count = screenProps.requestAlertPosts.length;
            isImportant = true;
            break;
          case "outPost_borrow":
            iconName = "slideshare";
            iconProvider = "Entypo";
            count = screenProps.borrowPosts.length;
            isImportant = false;
            break;
          case "outPost_return":
            iconName = "retweet";
            iconProvider = "FontAwesome";
            count = screenProps.returnAlertPosts.length;
            isImportant = true;
            break;
          case "outPost_history":
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

export default OutPostManagementBottomTabNavigator;
