import React from "react";
import PropTypes from "prop-types";

import { TabItem } from "../../util/tabItem";
import { ConnectionTabEnum } from "./connection_tabEnum";
import { NotificationItem } from "../../util/notificationItem";
import { TabBarContainer } from "../../componentShare/tabBar";

function ConnectionTabBar(props) {
  const { selectTab, onTabChange } = props;

  const onSelectFriend = e => {
    onTabChange(ConnectionTabEnum.FRIEND);
  };
  const onSelectMyRequest = e => {
    onTabChange(ConnectionTabEnum.MYREQUEST);
  };
  const onSelectFriendRequest = e => {
    onTabChange(ConnectionTabEnum.FRIENDREQUEST);
  };
  const onSelectSearch = e => {
    onTabChange(ConnectionTabEnum.SEARCH);
  };
  const onSelectDeny = e => {
    onTabChange(ConnectionTabEnum.DENY);
  };

  return (
    <TabBarContainer>
      {_generateTabItem(
        "tabSelector-connection-friend-react",
        selectTab === ConnectionTabEnum.FRIEND,
        "all friends",
        "user-friends",
        onSelectFriend,
        0,
        false,
        false
      )}

      {_generateTabItem(
        "tabSelector-connection-myRequest-react",
        selectTab === ConnectionTabEnum.MYREQUEST,
        "my request",
        "sign-out-alt",
        onSelectMyRequest,
        0,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-connection-friendRequest-react",
        selectTab === ConnectionTabEnum.FRIENDREQUEST,
        "friend request",
        "sign-in-alt",
        onSelectFriendRequest,
        0,
        true,
        true
      )}

      {_generateTabItem(
        "tabSelector-connection-search-react",
        selectTab === ConnectionTabEnum.SEARCH,
        "search",
        "search",
        onSelectSearch,
        0,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-connection-deny-react",
        selectTab === ConnectionTabEnum.DENY,
        "deny",
        "user-slash",
        onSelectDeny,
        0,
        false,
        true
      )}
    </TabBarContainer>
  );
}

function _generateTabItem(
  id,
  isSelect,
  caption,
  iconName,
  onSelect,
  noteCount,
  isImportant,
  isCssResponsive
) {
  return (
    <TabItem
      id={id}
      isSelect={isSelect}
      caption={caption}
      iconName={iconName}
      onSelect={onSelect}
      notificationItem={
        <NotificationItem count={noteCount} isImportant={isImportant} />
      }
      selectCssClass="appComponent-tab-item-select"
      unSelectCssClass="appComponent-tab-item-unSelect"
      hoverCssClass="appComponent-tab-item-hover"
      underlineSelectCssClass="appComponent-tab-item-underline-select"
      isCssResponsive={isCssResponsive}
    />
  );
}

ConnectionTabBar.propTypes = {
  selectTab: PropTypes.instanceOf(ConnectionTabEnum).isRequired,
  onTabChange: PropTypes.func.isRequired
};

export { ConnectionTabBar };
