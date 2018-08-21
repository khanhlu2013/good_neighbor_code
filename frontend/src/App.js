import React, { Component } from "react";
import "./App.css";
import { ConnectionManagement } from "./components/ConnectionManagement/index.js";
import DummyLoginForTestPurpose from "./components/DummyLoginForTestPurpose.react.js";
import keys from "./configs/keys.js";

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
    return (
      <div className="App">
        <h1>Welcome to Good Neighboors</h1>
        {this.state.loginUser ? (
          <ConnectionManagement loginUser={this.state.loginUser} />
        ) : (
          <div>
            <a href={keys.API_URL("auth.google")}>Login with Google</a>
            <DummyLoginForTestPurpose />
          </div>
        )}
      </div>
    );
  }
}

export default App;
