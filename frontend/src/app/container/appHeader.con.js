import { connect } from "react-redux";

import { changeAppTab } from "../action/selectAppTab.action";
import AppHeaderComponent from "../component/header/appHeader";
import { selectInPostApproveAlert } from "../../bus/inPost/inPost.selector";
import {
  selectOutPostRequestAlert,
  selectOutPostReturnAlert
} from "../../bus/outPost/outPost.selector";
import { inConnectionSelector } from "../../bus/connection/connection.selector";

const mapStateToProps = (state, ownProps) => {
  const { loginUser, isCheckingAuth } = state.auth;
  const loginUserId = loginUser && loginUser.id;

  //inPost
  const inPostAlertCount = selectInPostApproveAlert(
    state.inPost.posts,
    loginUserId
  ).length;

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
    isCheckingAuth,
    selectAppTab: state.selectAppTab,
    inPostAlertCount,
    outPostAlertCount,
    connectionAlertCount
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onAppTabChange: appTab => dispatch(changeAppTab(appTab))
});
const AppHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeaderComponent);

export default AppHeaderContainer;
