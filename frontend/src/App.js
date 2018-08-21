import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";

import { ConnectionManagement } from "./components/ConnectionManagement/index.js";
import keys from "./configs/keys.js";
import { Login } from "./components/Login";

class App extends Component {
  state = {
    loginUser: null
  };

  componentDidMount() {
    (async () => {
      let request;
      request = await fetch(keys.API_URL("profile"), {
        credentials: "include"
      });
      if (request.status !== 401) {
        this.setState({ loginUser: await request.json() });
      }
    })().catch(err => console.error("Error getting profile:", err));
  }

  render() {
    if (this.state.loginUser) {
      return <PrivateApp loginUser={this.state.loginUser} />;
    } else {
      return <Login />;
    }
  }
}

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

export default App;
