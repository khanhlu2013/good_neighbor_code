import React from "react";

import { PlayList } from "./playList";
import { AppShrinkWrap } from "../componentShare/appShrinkWrap";

function PublicApp() {
  return (
    <div id="appPublic-react">
      <AppShrinkWrap>
        <PlayList />
      </AppShrinkWrap>
    </div>
  );
}

export { PublicApp };
