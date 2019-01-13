import { connect } from "react-redux";
import PassThroughView from "../../../util/PassThrough.view";
import AuthSelector from "../../../app/selector/auth.selector";
import { logOut } from "../../../app/action/auth.action";

const mapStateToProps = (state, ownProps) => ({
  isLoggingOut: AuthSelector.isLoggingOut(state),
  loginUser: AuthSelector.loginUser(state)
});
const mapDispatchToProp = (dispatch, ownProps) => ({
  onLogOut: () => dispatch(logOut())
});

const ProfileManagementController = connect(
  mapStateToProps,
  mapDispatchToProp
)(PassThroughView);

export default ProfileManagementController;
