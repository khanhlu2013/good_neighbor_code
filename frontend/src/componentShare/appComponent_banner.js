import React from "react";

import "./appComponent_banner.css";

function AppComponentBanner(props) {
  return (
    <div className="appComponent-tabBar-container">
      <div className="app-container">{props.children}</div>
    </div>
  );
}

export { AppComponentBanner };
