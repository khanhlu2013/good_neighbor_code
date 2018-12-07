import { connect } from "react-redux";

import PrivateAppComponent from "../component/appPrivate.js";

const mapStateToProps = (state, ownProps) => ({
  selectAppTab: state.selectAppTab
});
const PrivateAppConnect = connect(mapStateToProps)(PrivateAppComponent);

export default PrivateAppConnect;
