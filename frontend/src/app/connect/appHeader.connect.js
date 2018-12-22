import { connect } from "react-redux";

import { changeAppTab } from "../action/selectAppTab.action";
import AppHeaderComponent from "../component/header/appHeader";
import { inConnectionSelector } from "../../bus/connection/connection.selector";
import {
  selectOutPostRequestAlert,
  selectOutPostReturnAlert
} from "@gn/common/bus/outPost/outPost.selector";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

const mapStateToProps = (state, ownProps) => {
  const { loginUser, isCheckedAuth } = state.auth;
  const loginUserId = loginUser && loginUser.id;

  //inPost
  const inPostAlertCount = InPostSelector.approveAlertPosts(state).length;

  //outpost
  const outPosts = state.outPost.posts;
  const requestAlert_outPosts = selectOutPostRequestAlert(outPosts);
  const returnAlert_outPosts = selectOutPostReturnAlert(outPosts);
  const outPostAlertCount =
    requestAlert_outPosts.length + returnAlert_outPosts.length;

  //connection
  const connectionAlertCount = inConnectionSelector(
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
