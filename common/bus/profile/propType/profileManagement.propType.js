import PropTypes from "prop-types";
import User from "../../../model/user";

const ProfileManagementPropType = {
  isLoggingOut: PropTypes.bool.isRequired,
  loginUser: PropTypes.instanceOf(User).isRequired,
  onLogOut: PropTypes.func.isRequired
};

export default ProfileManagementPropType;
