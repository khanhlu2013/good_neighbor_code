import React, { Component } from "react";
import PropTypes from "prop-types";
import validator from "validator";
import className from "classnames";

import "./backDoorAccess.css";
import { API } from "../api/profile-api";
import { LoadingIcon } from "../util";

class DummyLoginForTestPurpose extends Component {
  state = {
    email: "",
    name: "",
    isSubmitClicked: false,
    isAjaxing: false,
    isNameRequire: false
  };

  static getDerivedStateFromProps(props, state) {
    const { name, email, isSubmitClicked } = state;
    const isEmailValid = validator.isEmail(email);
    const isEmailWarning = isSubmitClicked && !isEmailValid;
    const nameIsEmpty = name.length === 0;
    return { isEmailWarning, isEmailValid, nameIsEmpty };
  }

  onEmailChange = evt => {
    const email = evt.target.value;
    this.setState({ email, isSubmitClicked: false });
  };

  onNameChange = evt => {
    const name = evt.target.value;
    this.setState({ name, isSubmitClicked: false });
  };

  onSubmit = evt => {
    this.setState({ isSubmitClicked: true });
    if (this.state.isEmailValid) {
      this.setState({ isAjaxing: true });
      (async () => {
        const user = await API.backDoorAccess(
          this.state.email,
          this.state.name
        );

        this.setState({ isSubmitClicked: false });
        this.props.onLoginUserChange(user);
      })().catch(e => {
        this.setState({ isAjaxing: false, isNameRequire: true });
      });
    }

    evt.preventDefault();
  };

  render() {
    const {
      isEmailWarning,
      isEmailValid,
      isNameRequire,
      nameIsEmpty
    } = this.state;

    return (
      <div id="backDoorAccess-react">
        <h2>back door access</h2>
        <p>
          This is Good Neighbor <b>testing</b> site. To make testing easy, you
          can use <b>back door access</b> to by pass Google login. <b>Note</b>:
          name field is optional unless you want to create a new account. Check
          out 'testing site: back door access' video for more info.
        </p>

        <p>
          <mark>
            <b>WARNING: </b>
            expect your testing data to be wiped out.
          </mark>
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="col-sm-4">
              <div className="input-group">
                <input
                  id="dummy_login_email"
                  type="text"
                  className={className({
                    "form-control": true,
                    "is-invalid": isEmailWarning,
                    "is-valid": isEmailValid
                  })}
                  onChange={this.onEmailChange}
                  value={this.state.email}
                  placeholder="email"
                />
                <div className="invalid-feedback">please enter valid email</div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="input-group">
                <input
                  id="dummy_login_name"
                  type="text"
                  className={className({
                    "form-control": true,
                    "is-invalid": isNameRequire
                  })}
                  onChange={this.onNameChange}
                  value={this.state.name}
                  placeholder="name"
                />
                <div className="invalid-feedback">
                  email is not found. Name is require to create new account
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              {this.state.isAjaxing ? (
                <LoadingIcon text="please wait" />
              ) : (
                <input
                  type="submit"
                  className={className({
                    btn: true,
                    "btn-success":
                      isEmailValid &&
                      (!isNameRequire || (isNameRequire && !nameIsEmpty)),
                    "btn-secondary": !isEmailValid,
                    "btn-warning": isEmailWarning,
                    "btn-danger": isNameRequire && nameIsEmpty
                  })}
                  value="back door access"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
DummyLoginForTestPurpose.propTypes = {
  onLoginUserChange: PropTypes.func.isRequired
};

export default DummyLoginForTestPurpose;
