import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import PropTypes from "prop-types";

import Post from "@gn/common/model/post";
import Share from "@gn/common/model/share";
import InPostUserHistoryListController from "@gn/common/bus/inPost/controller/inPost_userHistoryList.controller";
import { BUSINESS_ICON_SIZE } from "../../../share/uiConstant";
import TabItemMobileView from "../../../share/tabItem.mobileView";
import DUMMY_ID from "../../../share/dummyId";
import InPostListMobileView from "../view/inPostList.mobileView";
import PostUserHistoryListMobileView from "../../post/view/postUserHistoryList.mobileView";

const InPostManagementNavigator = createBottomTabNavigator(
  {
    inPost_all: {
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
    inPost_request: {
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
    inPost_approve: {
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
    inPost_borrow: {
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
    inPost_history: {
      screen: props => (
        <InPostUserHistoryListController
          shares={props.screenProps.returnShares}
          view={PostUserHistoryListMobileView}
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
          case "inPost_all":
            iconName = "ios-globe";
            iconProvider = "Ionicons";
            count = screenProps.posts.length;
            isImportant = false;
            break;
          case "inPost_request":
            iconName = "question";
            iconProvider = "FontAwesome";
            count = screenProps.requestPosts.length;
            isImportant = false;
            break;
          case "inPost_approve":
            iconName = "check";
            iconProvider = "FontAwesome";
            count = screenProps.approveAlertPosts.length;
            isImportant = true;
            break;
          case "inPost_borrow":
            iconName = "slideshare";
            iconProvider = "Entypo";
            count = screenProps.borrowPosts.length;
            isImportant = false;
            break;
          case "inPost_history":
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
