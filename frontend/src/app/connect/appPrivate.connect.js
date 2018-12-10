import { connect } from "react-redux";
import PrivateAppWebView from "../view/appPrivate.webView";

const mapStateToProps = (state, ownProps) => ({
  selectAppTab: state.selectAppTab
});
const PrivateAppConnect = connect(mapStateToProps)(PrivateAppWebView);

export default PrivateAppConnect;
