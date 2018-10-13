import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";

class ProfileManagement extends Component {}

ProfileManagement.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired
};
