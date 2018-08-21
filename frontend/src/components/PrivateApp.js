import React from "react";
import PropTypes from "prop-types";

import keys from "../configs/keys.js";
import { ConnectionManagement } from "./ConnectionManagement/index.js";

function PrivateApp(props) {
  return (
    <div id="PrivateApp-react" className="App">
      <h1>Welcome to Good Neighboors</h1>
      <div>
        Profile: {props.loginUser.name} - {props.loginUser.email}
        <a href={keys.API_URL("profile.logout")}>logout</a>
      </div>
      <ConnectionManagement loginUser={props.loginUser} />
    </div>
  );
}
PrivateApp.propTypes = {
  loginUser: PropTypes.object.required
};

export { PrivateApp };
