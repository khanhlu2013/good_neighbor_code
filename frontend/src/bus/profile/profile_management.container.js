import { connect } from "react-redux";

import { logOut } from "../../action/auth_action";
import ProfileManagementComponent from "./profile_management.component";

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
