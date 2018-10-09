import React from "react";
import PropTypes from "prop-types";

import "./inPostTabBar.css";
import "../postTabItem.css";
import { AppHeaderNavItem } from "../../util/appHeaderNavItem";
import { InPostTabEnum } from "./inPostTabEnum";
import { NotificationItem } from "../../util/notificationItem";
import { nullOrRequiredValidator } from "../../util";

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
    <div className="in-post-tab-bar box-shadow">
      {_generateTabItem(
        selectTab === InPostTabEnum.ALL,
        "friend posts",
        "globe",
        onSelectAll,
        allCount,
        false,
        false
      )}

      {_generateTabItem(
        selectTab === InPostTabEnum.REQUEST,
        "request",
        "question",
        onSelectRequest,
        requestCount,
        false,
        true
      )}

      {_generateTabItem(
        selectTab === InPostTabEnum.APPROVE,
        "approve",
        "check",
        onSelectApprove,
        approveCount,
        true,
        true
      )}

      {_generateTabItem(
        selectTab === InPostTabEnum.BORROW,
        "borrow",
        "hand-holding-heart",
        onSelectBorrow,
        borrowCount,
        false,
        true
      )}

      {_generateTabItem(
        selectTab === InPostTabEnum.HISTORY,
        "history",
        "history",
        onSelectHistory,
        historyCount,
        false,
        true
      )}
    </div>
  );
}

function _generateTabItem(
  isSelect,
  caption,
  iconName,
  onSelect,
  noteCount,
  isImportant,
  isResponsiveCaption
) {
  return (
    <AppHeaderNavItem
      isSelect={isSelect}
      caption={caption}
      iconName={iconName}
      onSelect={onSelect}
      notificationItem={
        <NotificationItem count={noteCount} isImportant={isImportant} />
      }
      selectCssClass="post-tab-item-select"
      unSelectCssClass="post-tab-item-unSelect"
      hoverCssClass="post-tab-item-hover"
      underlineSelectCssClass="post-tab-item-underline-select"
      isResponsiveCaption={isResponsiveCaption}
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
