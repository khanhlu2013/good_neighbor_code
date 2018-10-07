import React from "react";
import className from "classnames";
import PropTypes from "prop-types";

import { nullOrRequiredValidator } from "../util";
import { LoadingIcon } from "./loadingIcon";
import "./notificationItem.css";

function NotificationItem(props) {
  const { count, isImportant = true } = props;

  let html = null;
  if (count !== null && count !== 0) {
    html = (
      <span
        className={className({
          "text-white": isImportant,
          "bg-danger": isImportant,
          "text-dark": !isImportant
          // "bg-light": !isImportant
        })}
      >{`(${count})`}</span>
    );
  } else if (count === null) {
    html = <LoadingIcon text={null} />;
  } else {
    if (count !== 0) throw Error("Unexpected code path");
  }
  return <div className="notification-item">{html}</div>;
}
NotificationItem.propTypes = {
  count: nullOrRequiredValidator("number"),
  isImportant: PropTypes.bool
};

export { NotificationItem };
