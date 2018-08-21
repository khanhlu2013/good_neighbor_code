import React, { Component } from "react";
import "./App.css";

import keys from "./configs/keys.js";
import { Login } from "./components/Login";
import { PrivateApp } from "./components/PrivateApp";

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

export default App;
