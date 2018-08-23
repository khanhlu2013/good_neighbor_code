import React from "react";
import PropTypes from "prop-types";

import keys from "../configs/keys.js";
import { ConnectionManagement } from "./Connection/ConnectionManagement.js";
import { PostManagement } from "./Post/PostManagement.js";

function PrivateApp(props) {
  return (
    <div id="PrivateApp-react" className="App">
      <h1>Welcome to Good Neighboors</h1>
      <div>
        Profile: {props.loginUser.name} - {props.loginUser.email}
        <a href={keys.API_URL("profile.logout")}>logout</a>
      </div>
      <hr />
      <ConnectionManagement loginUser={props.loginUser} />
      <hr />
      <PostManagement />
    </div>
  );
}
PrivateApp.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { PrivateApp };
