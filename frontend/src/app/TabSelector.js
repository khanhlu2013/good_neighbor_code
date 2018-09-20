import React from "react";
import { Tab, TabList } from "react-tabs";

import { nullOrRequiredValidator, LoadingIcon } from "../util";

function TabSelector(props) {
  const {
    friendRequestCount,
    postRequestCount,
    unawareApproveShareCount
  } = props;

  const connectionNotification = _computeNotificationHtml(friendRequestCount);
  const outPostNotification = _computeNotificationHtml(postRequestCount);
  const inPostNotification = _computeNotificationHtml(unawareApproveShareCount);

  return (
    <div id="TabSelector-react" className="Tab-selector-list">
      <TabList>
        <Tab>
          <span id="TabSelector_InPost">
            Friend Posts
            {inPostNotification}
          </span>
        </Tab>
        <Tab>
          <span id="TabSelector_OutPost">
            My Posts
            {outPostNotification}
          </span>
        </Tab>
        <Tab>
          <span id="TabSelector_Connection">
            Friend
            {connectionNotification}
          </span>
        </Tab>
      </TabList>
    </div>
  );
}

function _computeNotificationHtml(count) {
  let html = null;
  if (count !== null && count !== 0) {
    html = <span className="text-danger">{` (${count})`}</span>;
  } else if (count === null) {
    html = <LoadingIcon text={null} isAnimate={true} />;
  } else {
    if (count !== 0) throw Error("Unexpected code path");
    html = null;
  }
  return html;
}

TabSelector.propTypes = {
  friendRequestCount: nullOrRequiredValidator("number"),
  postRequestCount: nullOrRequiredValidator("number"),
  unawareApproveShareCount: nullOrRequiredValidator("number")
};

export { TabSelector };
