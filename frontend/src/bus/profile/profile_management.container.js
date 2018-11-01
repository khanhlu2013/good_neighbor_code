import { connect } from "react-redux";

import { logOut } from "../../app/action/auth.action";
import ProfileManagementComponent from "./profile_management.com";

const mapStateToProps = (state, ownProps) => ({
  isLoggingOut: state.auth.isLoggingOut,
  loginUser: state.auth.loginUser
});
const mapDispatchToProp = (dispatch, ownProps) => ({
  onLogOutClick: () => dispatch(logOut())
});

const ProfileManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProp
)(ProfileManagementComponent);

export default ProfileManagementContainer;
