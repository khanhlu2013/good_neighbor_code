import React from "react";
import "./tabBar.css";

function TabBarContainer(props) {
  return <div className="tabBarContainer">{props.children}</div>;
}

export { TabBarContainer };
