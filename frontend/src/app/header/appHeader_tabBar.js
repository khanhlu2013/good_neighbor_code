import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { nullOrRequiredValidator } from "../../util";
import { AppTabEnum } from "../appTabEnum";
import { TabBar } from "../../componentUi/tabBar";
import { TabItem } from "../../componentUi/tabItem";

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
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
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
    <TabBar>
      {_generateTabItem(
        "tabSelector-inPost-react",
        selectTab === AppTabEnum.INPOST,
        "friend posts",
        "globe",
        onInPostNav,
        inPostNoteCount,
        TabItemContainerStart
      )}

      {_generateTabItem(
        "tabSelector-outPost-react",
        selectTab === AppTabEnum.OUTPOST,
        "my posts",
        "briefcase",
        onOutPostNav,
        outPostNoteCount,
        TabItemContainerMiddle
      )}

      {_generateTabItem(
        "tabSelector-connection-react",
        selectTab === AppTabEnum.CONNECTION,
        "friends",
        "user-friends",
        onConnectionNav,
        connectionNoteCount,
        TabItemContainerMiddle
      )}

      {_generateTabItem(
        "tabSelector-profile-react",
        selectTab === AppTabEnum.PROFILE,
        "me",
        "user-cog",
        onProfileNav,
        0,
        TabItemContainerEnd
      )}
    </TabBar>
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
          <notificationItem count={noteCount} isImportant={true} />
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
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeaderTabBar };
