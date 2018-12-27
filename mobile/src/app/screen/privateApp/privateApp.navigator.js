import React, { Component } from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Constants } from "expo";
import TabItemMobileView from "../../../share/tabItem.mobileView";
import { APP_ICON_SIZE } from "../../../share/uiConstant";
import InPostManagementController from "../../../common/bus/inPost/controller/inPostManagement.controller";
import InPostManagementMobileView, {
  InPostManagementNavigator
} from "../../../bus/inPost/view/inPostManagement.mobileView";
import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import OutPostManagementMobileView from "../../../bus/outPost/outPostManagement.mobileView";

const DrawerView = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "lime",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: 20 }}>Good Neighbor</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const _createNavigationOption = (iconName, iconProvider, title) => {
  return ({ navigation, screenProps }) => {
    const { inPostsAlertCount, outPostsAlertCount } = screenProps;
    const { routeName } = navigation.state;
    let alertCount;
    switch (routeName) {
      case "inPost":
        alertCount = inPostsAlertCount;
        break;

      case "outPost":
        alertCount = outPostsAlertCount;
        break;

      default:
        alertCount = 0;
    }
    return {
      drawerIcon: ({ tintColor }) => (
        <TabItemMobileView
          iconName={iconName}
          iconProvider={iconProvider}
          iconSize={APP_ICON_SIZE}
          iconColor={tintColor}
          iconCount={alertCount}
          iconCountIsImportant={true}
        />
      ),
      title
    };
  };
};

const inPostRouteTitle = "Friend Posts";
const outPostRouteTitle = "My Posts";

const InPostManagementScreen = props => (
  <ScreenTemplate navigation={props.navigation} routeTitle={inPostRouteTitle}>
    <InPostManagementController
      navigation={props.navigation}
      view={InPostManagementMobileView}
    />
  </ScreenTemplate>
);
InPostManagementScreen.router = InPostManagementNavigator.router;

const PrivateAppNavigator = createDrawerNavigator(
  {
    inPost: {
      screen: InPostManagementScreen,
      navigationOptions: _createNavigationOption(
        "ios-globe",
        "Ionicons",
        inPostRouteTitle
      )
    },
    outPost: {
      screen: props => (
        <ScreenTemplate
          navigation={props.navigation}
          routeTitle={outPostRouteTitle}
        >
          <OutPostManagementController view={OutPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption(
        "briefcase",
        "FontAwesome",
        outPostRouteTitle
      )
    }
  },
  {
    contentComponent: DrawerView,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);

function ScreenTemplate(props) {
  const { children, navigation, routeTitle } = props;
  return (
    <ScreenStyle>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
        </Left>
        <Right>
          <Text>{routeTitle}</Text>
        </Right>
      </Header>
      {children}
    </ScreenStyle>
  );
}
ScreenTemplate.propTypes = {
  navigation: PropTypes.object.isRequired
};

const ScreenStyle = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
`;

class PrivateAppView extends Component {
  static router = PrivateAppNavigator.router;
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchInPosts: PropTypes.func.isRequired,
    fetchOutPosts: PropTypes.func.isRequired,
    inPostsAlertCount: PropTypes.number.isRequired,
    outPostsAlertCount: PropTypes.number.isRequired
  };

  componentDidMount() {
    const { fetchInPosts, fetchOutPosts } = this.props;
    fetchInPosts();
    fetchOutPosts();
  }

  render() {
    const { navigation, inPostsAlertCount, outPostsAlertCount } = this.props;
    return (
      <PrivateAppNavigator
        navigation={navigation}
        screenProps={{ inPostsAlertCount, outPostsAlertCount }}
      />
    );
  }
}

export default PrivateAppView;
