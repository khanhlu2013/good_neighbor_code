import { connect } from "react-redux";

import PrivateAppComponent from "../component/appPrivate.js";

const mapStateToProps = (state, ownProps) => ({
  selectAppTab: state.selectAppTab
});
const PrivateAppContainer = connect(mapStateToProps)(PrivateAppComponent);

export default PrivateAppContainer;
