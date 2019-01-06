import { connect } from "react-redux";

import { changeAppTab } from "../action/selectAppTab.action";
import AppHeaderComponent from "../component/header/appHeader";
import { inConnectionFilter } from "@gn/common/bus/connection/connection.filter";
import OutPostSelector from "@gn/common/bus/outPost/outPost.selector";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

const mapStateToProps = (state, ownProps) => {
  const { loginUser, isCheckedAuth } = state.auth;
  const loginUserId = loginUser && loginUser.id;

  //inPost
  const inPostAlertCount = InPostSelector.approveAlertPosts(state).length;

  //outpost
  const requestAlert_outPosts = OutPostSelector.requestAlertPosts(state);
  const returnAlert_outPosts = OutPostSelector.returnAlertPosts(state);
  const outPostAlertCount =
    requestAlert_outPosts.length + returnAlert_outPosts.length;

  //connection
  const connectionAlertCount = inConnectionFilter(
    state.connection.connections,
    loginUserId
  ).length;
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
