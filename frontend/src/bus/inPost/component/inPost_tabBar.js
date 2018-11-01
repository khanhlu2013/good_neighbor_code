import React from "react";
import PropTypes from "prop-types";

import { InPostTabEnum } from "./inPost_tabEnum";
import { nullOrRequiredValidator } from "../../../util";
import { AppBodyTabBarStyle } from "../../../componentUi/style/tabBar_style";
import { AppBodyTabItem } from "../../../componentUi/appBodyTabItem";
import { NotificationItem } from "../../../componentUi/notificationItem";

function InPostTabBar(props) {
  const {
    selectTab,
    onTabChange,
    allCount,
    requestCount,
    approveCount,
    borrowCount,
    historyCount
  } = props;

  const onSelectAll = e => {
    onTabChange(InPostTabEnum.ALL);
  };
  const onSelectRequest = e => {
    onTabChange(InPostTabEnum.REQUEST);
  };
  const onSelectApprove = e => {
    onTabChange(InPostTabEnum.APPROVE);
  };
  const onSelectBorrow = e => {
    onTabChange(InPostTabEnum.BORROW);
  };
  const onSelectHistory = e => {
    onTabChange(InPostTabEnum.HISTORY);
  };

  return (
    <AppBodyTabBarStyle>
      {_generateTabItem(
        "tabSelector-inPost-all-react",
        selectTab === InPostTabEnum.ALL,
        "all friend posts",
        "globe",
        onSelectAll,
        allCount,
        false,
        false
      )}

      {_generateTabItem(
        "tabSelector-inPost-request-react",
        selectTab === InPostTabEnum.REQUEST,
        "request",
        "question",
        onSelectRequest,
        requestCount,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-inPost-approve-react",
        selectTab === InPostTabEnum.APPROVE,
        "approve",
        "check",
        onSelectApprove,
        approveCount,
        true,
        true
      )}

      {_generateTabItem(
        "tabSelector-inPost-borrow-react",
        selectTab === InPostTabEnum.BORROW,
        "borrow",
        "hand-holding-heart",
        onSelectBorrow,
        borrowCount,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-inPost-history-react",
        selectTab === InPostTabEnum.HISTORY,
        "history",
        "history",
        onSelectHistory,
        historyCount,
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
        <NotificationItem count={noteCount} isImportant={isImportant} />
      }
      isResponsive={isResponsive}
    />
  );
}

InPostTabBar.propTypes = {
  selectTab: PropTypes.instanceOf(InPostTabEnum).isRequired,
  onTabChange: PropTypes.func.isRequired,
  allCount: nullOrRequiredValidator("number"),
  requestCount: nullOrRequiredValidator("number"),
  approveCount: nullOrRequiredValidator("number"),
  borrowCount: nullOrRequiredValidator("number"),
  historyCount: nullOrRequiredValidator("number")
};

export { InPostTabBar };
