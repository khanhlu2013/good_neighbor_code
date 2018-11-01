import { connect } from "react-redux";

import PrivateAppComponent from "../component/appPrivate.com.js";

const mapStateToProps = (state, ownProps) => ({
  loginUser: state.auth.loginUser,
  selectAppTab: state.selectAppTab
});
const PrivateAppContainer = connect(mapStateToProps)(PrivateAppComponent);

export default PrivateAppContainer;
