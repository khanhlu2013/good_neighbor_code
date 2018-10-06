import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import "./appHeaderNav.css";
import {
  nullOrRequiredValidator,
  computeNotificationCountHtml
} from "../../util";

function AppHeaderNav(props) {
  const {
    onInPostNav,
    onOutPostNav,
    onConnectionNav,
    isInOutCon1BaseIndexTabVisible,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  const onInPostClicked = e => {
    onInPostNav();
  };

  const onOutPostClicked = e => {
    onOutPostNav();
  };

  const onConnectionClicked = e => {
    onConnectionNav();
  };

  const outPostNoteHtml = computeNotificationCountHtml(outPostNoteCount);
  const inPostNoteHtml = computeNotificationCountHtml(inPostNoteCount);
  const connectionNoteHtml = computeNotificationCountHtml(connectionNoteCount);

  return (
    <div className="app-header-nav">
      <button
        className={className({
          "app-header-nav-item": true,
          btn: true,
          "btn-sm": true,
          "btn-light": isInOutCon1BaseIndexTabVisible === 1,
          "btn-primary": isInOutCon1BaseIndexTabVisible !== 1
        })}
        onClick={onInPostClicked}
      >
        friend post {inPostNoteHtml}
      </button>
      <button
        className={className({
          "app-header-nav-item": true,
          btn: true,
          "btn-sm": true,
          "btn-light": isInOutCon1BaseIndexTabVisible === 2,
          "btn-primary": isInOutCon1BaseIndexTabVisible !== 2
        })}
        onClick={onOutPostClicked}
      >
        my post {outPostNoteHtml}
      </button>
      <button
        className={className({
          "app-header-nav-item": true,
          btn: true,
          "btn-sm": true,
          "btn-light": isInOutCon1BaseIndexTabVisible === 3,
          "btn-primary": isInOutCon1BaseIndexTabVisible !== 3
        })}
        onClick={onConnectionClicked}
      >
        friend {connectionNoteHtml}
      </button>
    </div>
  );
}

AppHeaderNav.propTypes = {
  onInPostNav: PropTypes.func.isRequired,
  onOutPostNav: PropTypes.func.isRequired,
  onConnectionNav: PropTypes.func.isRequired,
  isInOutCon1BaseIndexTabVisible: PropTypes.number.isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeaderNav };
