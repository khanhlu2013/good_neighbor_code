import React, { Component } from "react";
import PropTypes from "prop-types";

import "./backDoorAccess.css";
import { API } from "../api/profile-api";

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
    (async () => {
      const user = await API.backDoorAccess(this.state.email, this.state.name);
      this.props.onLoginUserChange(user);
    })();

    evt.preventDefault();
  };

  render() {
    return (
      <div id="backDoorAccess-react">
        <p>
          Good Neighbor is in testing phase. Thus, you can use{" "}
          <b>back door access</b> to by pass Google. <b>Note</b>: name field is
          optional unless you want to create a new account.
        </p>

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

          <input
            type="submit"
            className="btn btn-success"
            value="back door access"
          />
        </form>
      </div>
    );
  }
}
DummyLoginForTestPurpose.propTypes = {
  onLoginUserChange: PropTypes.func.isRequired
};

export default DummyLoginForTestPurpose;
