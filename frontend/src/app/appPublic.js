import React from "react";

import { PlayList } from "./playList";

class Video {
  constructor(title, duration, id) {
    Object.assign(this, { title, duration, id });
  }
}

function PublicApp() {
  const data = [
    ["Good Neighbor: what & why", "1:22", "CkHOh7GKXpk"],
    ["login / sign up: single entry point", "1:35", "gUSjHwJ7uN4"],
    ["testing site: back door login", "1:35", "WTXBSnovQhs"],
    ["networking", "1:15", "Zc4sCEe7TRs"],
    ["post, request, approve, return", "5:00", "KuGMl_EW55A"]
  ];
  const videos = data.map(data => new Video(...data));
  return (
    <div>
      <PlayList videos={videos} />
    </div>
  );
}

export { PublicApp };
