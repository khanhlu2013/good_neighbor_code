import React from "react";
import "./tabBarContainer.css";

function TabBarContainer(props) {
  return <div className="tabBarContainer">{props.children}</div>;
}

export { TabBarContainer };
