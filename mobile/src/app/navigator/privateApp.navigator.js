import React, { Component } from "react";
import { connect } from "react-redux";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Constants } from "expo";

import { APP_ICON_SIZE } from "../../share/uiConstant";
import { Header, Left, Right, Icon } from "native-base";
import fetchInPosts from "../../common/bus/inPost/action/fetchInPosts.action";
import { fetchOutPosts } from "../../common/bus/outPost/action/fetchOutPosts.action";
import InPostManagementMobileView from "../../bus/inPost/view/inPostManagement.mobileView";
import OutPostManagementController from "../../common/bus/outPost/controller/outPostManagement.controller";
import InPostManagementController from "../../common/bus/inPost/controller/inPostManagement.controller";
import InPostSelector from "../../common/bus/inPost/inPost.selector";
import OutPostSelector from "../../common/bus/outPost/outPost.selector";
import OutPostManagementMobileView from "../../bus/outPost/outPostManagement.mobileView";
import TabItemMobileView from "../../share/tabItem.mobileView";

const CustomDrawerComponent = props => (
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

const _createNavigationOption = (
  iconName,
  iconProvider,
  title
  // iconCount,
  // iconIsImportant
) => {
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

const Nav = createDrawerNavigator(
  {
    inPost: {
      screen: props => (
        <ScreenTemplate navigation={props.navigation}>
          <InPostManagementController view={InPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption(
        "ios-globe",
        "Ionicons",
        "Friend Posts"
      )
    },
    outPost: {
      screen: props => (
        <ScreenTemplate navigation={props.navigation}>
          <OutPostManagementController view={OutPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption(
        "briefcase",
        "FontAwesome",
        "My Posts"
      )
    }
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);

function ScreenTemplate(props) {
  const { children, navigation } = props;
  return (
    <ScreenStyle>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
        </Left>
        <Right>
          <Text>{navigation.state.routeName}</Text>
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

class PrivateAppNavigator extends Component {
  static router = Nav.router;

  componentDidMount() {
    const { fetchInPosts, fetchOutPosts } = this.props;
    fetchInPosts();
    fetchOutPosts();
  }

  render() {
    const { navigation, inPostsAlertCount, outPostsAlertCount } = this.props;
    return (
      <Nav
        navigation={navigation}
        screenProps={{ inPostsAlertCount, outPostsAlertCount }}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  inPostsAlertCount: InPostSelector.approveAlertPosts(state).length,
  outPostsAlertCount:
    OutPostSelector.requestAlertPosts(state).length +
    OutPostSelector.returnAlertPosts(state).length
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPosts: () => dispatch(fetchInPosts()),
  fetchOutPosts: () => dispatch(fetchOutPosts())
});

const PrivateAppHere = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateAppNavigator);

export default PrivateAppHere;
