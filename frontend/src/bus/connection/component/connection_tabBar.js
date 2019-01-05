import React from "react";
import PropTypes from "prop-types";

import AlertItem from "../../../share/alertItem";
import ConnectionTabEnum from "./connection_tabEnum";
import BusinessTabItem from "../../../share/tabItem/businessTabItem";
import BusinessTabBarStyle from "../../../share/style/tabBarStyle/businessTabBar.style";

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
  const onSelectOutConnection = e => {
    onTabChange(ConnectionTabEnum.OUT_CONNECTION);
  };
  const onSelectInConnection = e => {
    onTabChange(ConnectionTabEnum.IN_CONNECTION);
  };
  const onSelectSearch = e => {
    onTabChange(ConnectionTabEnum.SEARCH);
  };
  const onSelectDeny = e => {
    onTabChange(ConnectionTabEnum.DENY);
  };

  return (
    <BusinessTabBarStyle>
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
        "tabSelector-connection-outConnection-react",
        selectTab === ConnectionTabEnum.OUT_CONNECTION,
        "my request",
        "sign-out-alt",
        onSelectOutConnection,
        outConnectionCount,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-connection-inConnection-react",
        selectTab === ConnectionTabEnum.IN_CONNECTION,
        "friend request",
        "sign-in-alt",
        onSelectInConnection,
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
    </BusinessTabBarStyle>
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
    <BusinessTabItem
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
