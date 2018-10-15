import React from "react";
import PropTypes from "prop-types";

import "./outPostTabBar.css";
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
    <div className="tab-bar">
      {_generateTabItem(
        "tabSelector-outPost-all-react",
        selectTab === OutPostTabEnum.ALL,
        "all my posts",
        "briefcase",
        onSelectAll,
        allCount,
        false,
        false
      )}

      {_generateTabItem(
        "tabSelector-outPost-request-react",
        selectTab === OutPostTabEnum.REQUEST,
        "request",
        "question",
        onSelectRequest,
        requestCount,
        true,
        true
      )}

      {_generateTabItem(
        "tabSelector-outPost-borrow-react",
        selectTab === OutPostTabEnum.BORROW,
        "borrow",
        "hand-holding-heart",
        onSelectBorrow,
        borrowCount,
        false,
        true
      )}

      {_generateTabItem(
        "tabSelector-outPost-return-react",
        selectTab === OutPostTabEnum.RETURN,
        "return",
        "retweet",
        onSelectReturn,
        returnCount,
        true,
        true
      )}

      {_generateTabItem(
        "tabSelector-outPost-history-react",
        selectTab === OutPostTabEnum.HISTORY,
        "history",
        "history",
        onSelectHistory,
        historyCount,
        false,
        true
      )}

      <button
        id="createPostBtn-react"
        onClick={onNewPostClicked}
        className="btn btn-success new-post-btn"
      >
        new
      </button>
    </div>
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
