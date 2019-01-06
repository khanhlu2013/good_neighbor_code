import { connect } from "react-redux";

import { changeAppTab } from "../action/selectAppTab.action";
import AppHeaderComponent from "../component/header/appHeader";
import ConnectionSelector from "@gn/common/bus/connection/connection.selector";
import AuthSelector from "@gn/common/app/selector/auth.selector";
import OutPostSelector from "@gn/common/bus/outPost/outPost.selector";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

const mapStateToProps = (state, ownProps) => {
  const loginUser = AuthSelector.loginUser(state);
  const isCheckedAuth = AuthSelector.isCheckedAuth(state);

  //inPost
  const inPostAlertCount = InPostSelector.approveAlertPosts(state).length;

  //outpost
  const requestAlert_outPosts = OutPostSelector.requestAlertPosts(state);
  const returnAlert_outPosts = OutPostSelector.returnAlertPosts(state);
  const outPostAlertCount =
    requestAlert_outPosts.length + returnAlert_outPosts.length;

  //connection
  const connectionAlertCount = ConnectionSelector.connectionAlertCount(state);
  return {
    loginUser,
    isCheckedAuth,
    selectAppTab: state.selectAppTab,
    inPostAlertCount,
    outPostAlertCount,
    connectionAlertCount
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onAppTabChange: appTab => dispatch(changeAppTab(appTab))
});
const AppHeaderConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeaderComponent);

export default AppHeaderConnect;
