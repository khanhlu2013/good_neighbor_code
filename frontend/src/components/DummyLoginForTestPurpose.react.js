import React, { Component } from "react";
import keys from "../configs/keys.js";

class DummyLoginForTestPurpose extends Component {
  state = {
    email: "",
    name: ""
  };

  onEmailChange = evt => {
    const email = evt.currentTarget.value;
    this.setState({ email });
  };

  onNameChange = evt => {
    const name = evt.currentTarget.value;
    this.setState({ name });
  };

  onSubmit = evt => {
    const url = keys.API_URL("auth.dummy_login_for_test_purpose", {
      email: this.state.email,
      name: this.state.name
    });
    window.location.href = url;
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            id="dummy_login_email"
            type="text"
            onChange={this.onEmailChange}
            value={this.state.email}
            placeholder="email"
          />

          <input
            id="dummy_login_name"
            type="text"
            onChange={this.onNameChange}
            value={this.state.name}
            placeholder="name"
          />

          <input type="submit" value="Dummy Login" />
        </form>
      </div>
    );
  }
}

export default DummyLoginForTestPurpose;
