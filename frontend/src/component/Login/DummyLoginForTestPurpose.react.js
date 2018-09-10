import React, { Component } from "react";
import { API_URL } from "../../api/api-url";

class DummyLoginForTestPurpose extends Component {
  state = {
    email: "",
    name: ""
  };

  onEmailChange = evt => {
    const email = evt.target.value;
    this.setState({ email });
  };

  onNameChange = evt => {
    const name = evt.target.value;
    this.setState({ name });
  };

  onSubmit = evt => {
    const url = API_URL("auth.login_for_test_dev", {
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
