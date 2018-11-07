import React from "react";
import PropTypes from "prop-types";

import { AppBodyTabBarStyle } from "../../../share/style/tabBar_style";
import AlertItem from "../../../share/alertItem";
import ConnectionTabEnum from "./connection_tabEnum";
import AppBodyTabItem from "../../../share/appBodyTabItem";

function ConnectionTabBar(props) {
  const {
    selectTab,
    onTabChange,
    friendConnectionCount,
    inConnectionCount,
    outConnectionCount,
    denyConnectionCount
  } = props;

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
    <AppBodyTabBarStyle>
      {_generateTabItem(
        "tabSelector-connection-friend-react",
        selectTab === ConnectionTabEnum.FRIEND,
        "all friends",
        "user-friends",
        onSelectFriend,
        friendConnectionCount,
        false,
        false
      )}

      {_generateTabItem(
        "tabSelector-connection-myRequest-react",
        selectTab === ConnectionTabEnum.MYREQUEST,
        "my request",
        "sign-out-alt",
        onSelectMyRequest,
        outConnectionCount,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-connection-friendRequest-react",
        selectTab === ConnectionTabEnum.FRIENDREQUEST,
        "friend request",
        "sign-in-alt",
        onSelectFriendRequest,
        inConnectionCount,
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
        denyConnectionCount,
        false,
        true
      )}
    </AppBodyTabBarStyle>
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
  isResponsive
) {
  return (
    <AppBodyTabItem
      id={id}
      isSelect={isSelect}
      caption={caption}
      iconName={iconName}
      onSelect={onSelect}
      notificationItem={
        <AlertItem count={noteCount} isImportant={isImportant} />
      }
      isResponsive={isResponsive}
    />
  );
}

ConnectionTabBar.propTypes = {
  selectTab: PropTypes.instanceOf(ConnectionTabEnum).isRequired,
  onTabChange: PropTypes.func.isRequired,
  friendConnectionCount: PropTypes.number.isRequired,
  inConnectionCount: PropTypes.number.isRequired,
  outConnectionCount: PropTypes.number.isRequired,
  denyConnectionCount: PropTypes.number.isRequired
};

export default ConnectionTabBar;
