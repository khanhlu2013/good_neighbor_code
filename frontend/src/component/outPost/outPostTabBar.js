import React from "react";
import PropTypes from "prop-types";

import "../postTabBar.css";
import "../postTabItem.css";
import { TabItem } from "../../util/tabItem";
import { OutPostTabEnum } from "./outPostTabEnum";
import { NotificationItem } from "../../util/notificationItem";
import { nullOrRequiredValidator } from "../../util";

function OutPostTabBar(props) {
  const {
    selectTab,
    onTabChange,
    onCreateNewPost,
    allCount,
    requestCount,
    borrowCount,
    returnCount,
    historyCount
  } = props;

  const onSelectAll = e => {
    onTabChange(OutPostTabEnum.ALL);
  };
  const onSelectRequest = e => {
    onTabChange(OutPostTabEnum.REQUEST);
  };
  const onSelectBorrow = e => {
    onTabChange(OutPostTabEnum.BORROW);
  };
  const onSelectReturn = e => {
    onTabChange(OutPostTabEnum.RETURN);
  };
  const onSelectHistory = e => {
    onTabChange(OutPostTabEnum.HISTORY);
  };
  const onNewPostClicked = e => {
    onCreateNewPost();
  };

  return (
    <div className="post-tab-bar shadow-box">
      {_generateTabItem(
        selectTab === OutPostTabEnum.ALL,
        "all my posts",
        "briefcase",
        onSelectAll,
        allCount,
        false,
        false
      )}

      {_generateTabItem(
        selectTab === OutPostTabEnum.REQUEST,
        "request",
        "question",
        onSelectRequest,
        requestCount,
        true,
        true
      )}

      {_generateTabItem(
        selectTab === OutPostTabEnum.BORROW,
        "borrow",
        "hand-holding-heart",
        onSelectBorrow,
        borrowCount,
        false,
        true
      )}

      {_generateTabItem(
        selectTab === OutPostTabEnum.RETURN,
        "return",
        "retweet",
        onSelectReturn,
        returnCount,
        true,
        true
      )}

      {_generateTabItem(
        selectTab === OutPostTabEnum.HISTORY,
        "history",
        "history",
        onSelectHistory,
        historyCount,
        false,
        true
      )}

      <button onClick={onNewPostClicked} className="btn btn-sm btn-success">
        new
      </button>
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
    <TabItem
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

OutPostTabBar.propTypes = {
  selectTab: PropTypes.instanceOf(OutPostTabEnum).isRequired,
  onTabChange: PropTypes.func.isRequired,
  onCreateNewPost: PropTypes.func.isRequired,
  allCount: nullOrRequiredValidator("number"),
  requestCount: nullOrRequiredValidator("number"),
  borrowCount: nullOrRequiredValidator("number"),
  returnCount: nullOrRequiredValidator("number"),
  historyCount: nullOrRequiredValidator("number")
};

export { OutPostTabBar };
