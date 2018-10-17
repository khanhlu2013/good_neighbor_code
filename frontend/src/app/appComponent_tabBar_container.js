import React from "react";

import "./appComponent_tabBar_container.css";

function AppComponentTabBarContainer(props) {
  return (
    <div className="appComponent-tabBar-container banner">
      <div className="app-container">{props.children}</div>
    </div>
  );
}

export { AppComponentTabBarContainer };
