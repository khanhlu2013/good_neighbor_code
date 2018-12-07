import { Component } from "react";
import validator from "validator";
import { API } from "@good-neighbor/common";
import { storeBackdoorLoginUser } from "../action/auth.action";
import PropTypes from "prop-types";

export default class BackdoorLoginController extends Component {
  state = {
    email: "",
    name: "",
    isSubmitFormClicked: false,
    isAjaxing: false,
    isNameRequire: false
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.func.isRequired
  };
  static getDerivedStateFromProps(props, state) {
    const { name, email } = state;
    const isEmailValid = validator.isEmail(email.trim());
    const nameIsEmpty = name.length === 0;
    return { isEmailValid, nameIsEmpty };
  }

  onEmailChange = text => {
    this.setState({ email: text, isSubmitFormClicked: false });
  };

  onNameChange = text => {
    this.setState({ name: text, isSubmitFormClicked: false });
  };

  onSubmit = evt => {
    this.setState({
      isSubmitFormClicked: true,
      email: this.state.email.trim()
    });
    if (this.state.isEmailValid) {
      this.setState({ isAjaxing: true });
      (async () => {
        const user = await API.backDoorLogin(this.state.email, this.state.name);
        this.setState({
          isSubmitFormClicked: false,
          isAjaxing: false,
          isNameRequire: user === null
        });
        this.props.dispatch(storeBackdoorLoginUser(user));
      })();
    }

    evt.preventDefault();
  };

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
