import PropTypes from "prop-types";

const BackdoorLoginPropTypes = {
  isEmailValid: PropTypes.bool.isRequired,
  isNameRequire: PropTypes.bool.isRequired,
  nameIsEmpty: PropTypes.bool.isRequired,
  //---
  isSubmitFormClicked: PropTypes.bool.isRequired,
  isAjaxing: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  //---
  onSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired
};

export default BackdoorLoginPropTypes;
