import { connect } from "react-redux";

import { logOut } from "@gn/common/app/action/auth.action";
import ProfileManagementComponent from "../component/profile_management";

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
