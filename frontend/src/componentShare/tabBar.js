import React from "react";
import "./tabBar.css";

function TabBar(props) {
  return <div className="tabBar">{props.children}</div>;
}

export { TabBar };
