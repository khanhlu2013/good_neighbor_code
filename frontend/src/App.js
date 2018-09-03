import React, { Component } from "react";
import "./App.css";

import { Login } from "./component/Login";
import { PrivateApp } from "./AppPrivate";
import { API } from "./api/profile-api";

class App extends Component {
  state = {
    loginUser: null
  };

  componentDidMount() {
    (async () => {
      const user = await API.profile();
      if (user) {
        this.setState({ loginUser: user });
      }
    })();
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
