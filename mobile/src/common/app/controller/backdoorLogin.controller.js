import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import validator from "validator";

import { RECEIVE_AUTH_CHECK_RESULT } from "../action/auth.action";
import API from "../../api";

class BackdoorLoginControllerDisconnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      isSubmitFormClicked: false,
      isAjaxing: false,
      isNameRequire: false
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { name, email } = state;
    const isEmailValid = validator.isEmail(email.trim());
    const nameIsEmpty = name.length === 0;
    return { isEmailValid, nameIsEmpty };
  }

  onEmailChange(text) {
    this.setState({
      email: text,
      isSubmitFormClicked: false,
      isNameRequire: false
    });
  }

  onNameChange(text) {
    this.setState({ name: text, isSubmitFormClicked: false });
  }

  onSubmit(evt) {
    this.setState({
      isSubmitFormClicked: true,
      email: this.state.email.trim()
    });
    if (this.state.isEmailValid) {
      this.setState({ isAjaxing: true });
      (async () => {
        const authenticatedUser = await API.backDoorLogin(
          this.state.email,
          this.state.name
        );
        this.setState({
          isSubmitFormClicked: false,
          isAjaxing: false,
          isNameRequire: authenticatedUser === null
        });
        this.props.dispatch({
          type: RECEIVE_AUTH_CHECK_RESULT,
          authenticatedUser
        });
      })();
    }

    evt.preventDefault();
  }

  render() {
    return this.props.view(
      //derived state
      this.state.isEmailValid,
      this.state.isNameRequire,
      this.state.nameIsEmpty,
      //raw state
      this.state.isSubmitFormClicked,
      this.state.isAjaxing,
      this.state.email,
      this.state.name,
      //handler
      this.onSubmit,
      this.onEmailChange,
      this.onNameChange
    );
  }
}

BackdoorLoginControllerDisconnect.propsType = {
  dispatch: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};

const BackdoorLoginControllerConnect = connect()(
  BackdoorLoginControllerDisconnect
); //i need the dispatch function
export default BackdoorLoginControllerConnect;
