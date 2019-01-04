import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { Button, Text, Icon } from "native-base";
import OutPostListController from "../../../common/bus/outPost/controller/outPostList.controller";
import DUMMY_ID from "../../../share/dummyId";
import OutPostListMobileView from "../view/outPostList.mobileView";
import OutPostUserHistoryListScreen from "../screen/outPostUserHistoryList.screen";

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

const OutPostManagementBottomTabNavigator = createBottomTabNavigator({
  outPost_all: screenFactory("all", "posts"),
  outPost_request: screenFactory("request", "requestAlertPosts"),
  outPost_borrow: screenFactory("borrow", "borrowPosts"),
  outPost_return: screenFactory("return", "returnAlertPosts"),
  outPost_history: {
    screen: props => {
      const { screenProps } = props;
      const { returnShares } = screenProps;

      return <OutPostUserHistoryListScreen shares={returnShares} />;
    },
    navigationOptions: {
      title: "history"
    }
  },
  AddButton: {
    screen: () => null,
    navigationOptions: ({ navigation }) => ({
      tabBarButtonComponent: () => (
        <View
          style={{
            flex: 1
          }}
        >
          <Button
            style={{ alignSelf: "center", marginTop: 25 }}
            small
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
});

export default OutPostManagementBottomTabNavigator;
