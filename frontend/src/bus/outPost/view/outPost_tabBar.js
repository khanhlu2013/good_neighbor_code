import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import OutPostTabEnum from "./outPost_tabEnum";
import BusinessTabItem from "../../../share/tabItem/businessTabItem";
import AlertItem from "../../../share/alertItem";
import BusinessTabBarStyle from "../../../share/style/tabBarStyle/businessTabBar.style";
import { nullOrRequiredValidator } from "@gn/common/util";

const NewPostButtonStyle = styled.div`
  display: flex;
  align-self: center;
`;

function OutPostTabBar(props) {
  const {
    selectTab,
    onTabChange,
    onCreateNewPostClick,
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

  return (
    <BusinessTabBarStyle>
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

      <NewPostButtonStyle>
        <button
          id="createPostBtn-react"
          onClick={onCreateNewPostClick}
          className="btn btn-success"
        >
          new
        </button>
      </NewPostButtonStyle>
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

OutPostTabBar.propTypes = {
  selectTab: PropTypes.instanceOf(OutPostTabEnum).isRequired,
  onTabChange: PropTypes.func.isRequired,
  onCreateNewPostClick: PropTypes.func.isRequired,
  allCount: nullOrRequiredValidator("number"),
  requestCount: nullOrRequiredValidator("number"),
  borrowCount: nullOrRequiredValidator("number"),
  returnCount: nullOrRequiredValidator("number"),
  historyCount: nullOrRequiredValidator("number")
};

export default OutPostTabBar;
