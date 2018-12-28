import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import PropTypes from "prop-types";

import Post from "../../../common/model/post";
import Share from "../../../common/model/share";
import InPostUserHistoryListMobileView from "../view/inPost_userHistoryList.mobileView";
import InPostUserHistoryListController from "../../../common/bus/inPost/controller/inPost_userHistoryList.controller";
import { BUSINESS_ICON_SIZE } from "../../../share/uiConstant";
import TabItemMobileView from "../../../share/tabItem.mobileView";
import DUMMY_ID from "../../../share/dummyId";
import InPostListMobileView from "../view/inPostList.mobileView";

const InPostManagementNavigator = createBottomTabNavigator(
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
InPostManagementNavigator.propTypes = {
  screenProps: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.instanceOf(Post)).isRequired,
    requestPosts: PropTypes.arrayOf(PropTypes.instanceOf(Post)).isRequired,
    borrowPosts: PropTypes.arrayOf(PropTypes.instanceOf(Post)).isRequired,
    approveAlertPosts: PropTypes.arrayOf(PropTypes.instanceOf(Post)).isRequired,
    returnShares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired
  })
};

export default InPostManagementNavigator;
