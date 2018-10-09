import React from "react";
import PropTypes from "prop-types";

import "./inPostTabBar.css";
import "../postTabItem.css";
import { AppHeaderNavItem } from "../../app/header/appHeaderNavItem";
import { InPostTabEnum } from "./inPostTabEnum";
import { NotificationItem } from "../../util/notificationItem";
import { nullOrRequiredValidator } from "../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="in-post-tab-bar-left-group">
        <FontAwesomeIcon icon="play" />
      </div>
      <div className="in-post-tab-bar-right-group">
        {_generateTabItem(
          selectTab === InPostTabEnum.ALL,
          "all",
          "play",
          onSelectAll,
          allCount,
          false
        )}

        {_generateTabItem(
          selectTab === InPostTabEnum.REQUEST,
          "request",
          "play",
          onSelectRequest,
          requestCount,
          false
        )}

        {_generateTabItem(
          selectTab === InPostTabEnum.APPROVE,
          "approve",
          "play",
          onSelectApprove,
          approveCount,
          true
        )}

        {_generateTabItem(
          selectTab === InPostTabEnum.BORROW,
          "borrow",
          "play",
          onSelectBorrow,
          borrowCount,
          false
        )}

        {_generateTabItem(
          selectTab === InPostTabEnum.HISTORY,
          "history",
          "play",
          onSelectHistory,
          historyCount,
          false
        )}
      </div>
    </div>
  );
}

function _generateTabItem(
  isSelect,
  caption,
  iconName,
  onSelect,
  noteCount,
  isImportant
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
