import React from "react";

import "./appHeader_banner.css";

function AppHeaderBanner(props) {
  return <div className="appHeader-banner">{props.children}</div>;
}

export { AppHeaderBanner };
