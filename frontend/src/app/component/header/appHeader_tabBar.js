import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { AppHeaderTabBarStyle } from "../../../share/style/tabBar_style";
import { TabItem } from "../../../share/tabItem";
import NotificationItem from "../../../share/notificationItem";
import AppTabEnum from "../appTabEnum";

const TabItemContainerStart = styled.div`
  margin-right: 20px;
`;
const TabItemContainerEnd = styled.div`
  margin-left: 20px;
`;
const TabItemContainerMiddle = styled.div`
  margin: 0 20px;
`;

function AppHeaderTabBar(props) {
  const {
    onAppTabChange,
    selectAppTab,
    inPostAlertCount,
    outPostAlertCount,
    connectionAlertCount
  } = props;

  const onInPostNav = e => {
    onAppTabChange(AppTabEnum.INPOST);
  };
  const onOutPostNav = e => {
    onAppTabChange(AppTabEnum.OUTPOST);
  };
  const onConnectionNav = e => {
    onAppTabChange(AppTabEnum.CONNECTION);
  };
  const onProfileNav = e => {
    onAppTabChange(AppTabEnum.PROFILE);
  };

  return (
    <AppHeaderTabBarStyle>
      {_generateTabItem(
        "tabSelector-inPost-react",
        selectAppTab === AppTabEnum.INPOST,
        "friend posts",
        "globe",
        onInPostNav,
        inPostAlertCount,
        TabItemContainerStart
      )}

      {_generateTabItem(
        "tabSelector-outPost-react",
        selectAppTab === AppTabEnum.OUTPOST,
        "my posts",
        "briefcase",
        onOutPostNav,
        outPostAlertCount,
        TabItemContainerMiddle
      )}

      {_generateTabItem(
        "tabSelector-connection-react",
        selectAppTab === AppTabEnum.CONNECTION,
        "friends",
        "user-friends",
        onConnectionNav,
        connectionAlertCount,
        TabItemContainerMiddle
      )}

      {_generateTabItem(
        "tabSelector-profile-react",
        selectAppTab === AppTabEnum.PROFILE,
        "me",
        "user-cog",
        onProfileNav,
        0,
        TabItemContainerEnd
      )}
    </AppHeaderTabBarStyle>
  );
}

function _generateTabItem(
  id,
  isSelect,
  caption,
  iconName,
  onSelect,
  noteCount,
  Container
) {
  return (
    <Container>
      <TabItem
        id={id}
        isSelect={isSelect}
        caption={caption}
        iconName={iconName}
        onSelect={onSelect}
        notificationItem={
          <NotificationItem count={noteCount} isImportant={true} />
        }
        selectColor="white"
        unSelectColor="rgb(192, 203, 211)"
        hoverColor="white"
        undelineColor="white"
        isResponsive={true}
      />
    </Container>
  );
}
AppHeaderTabBar.propTypes = {
  onAppTabChange: PropTypes.func.isRequired,
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostAlertCount: PropTypes.number.isRequired,
  outPostAlertCount: PropTypes.number.isRequired,
  connectionAlertCount: PropTypes.number.isRequired
};

export default AppHeaderTabBar;
