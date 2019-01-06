import { connect } from "react-redux";

import { logOut } from "@gn/common/app/action/auth.action";
import ProfileManagementComponent from "../component/profile_management";
import AuthSelector from "@gn/common/app/selector/auth.selector";

const mapStateToProps = (state, ownProps) => ({
  isLoggingOut: AuthSelector.isLoggingOut(state),
  loginUser: AuthSelector.loginUser(state)
});
const mapDispatchToProp = (dispatch, ownProps) => ({
  onLogOutClick: () => dispatch(logOut())
});

const ProfileManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProp
)(ProfileManagementComponent);

export default ProfileManagementContainer;
