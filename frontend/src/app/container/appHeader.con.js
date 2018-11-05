import { connect } from "react-redux";

import { changeAppTab } from "../action/selectAppTab.action";
import AppHeaderComponent from "../component/header/appHeader";
import { filterInPostApproveAlert } from "../../bus/inPost/inPost.alert";
import {
  filterOutPostRequestAlert,
  filterOutPostReturnAlert
} from "../../bus/outPost/outPost.alert";
import { filterConnectionRequestAlert } from "../../bus/connection/connection.alert";

const mapStateToProps = (state, ownProps) => {
  const { loginUser, isCheckingAuth } = state.auth;
  const loginUserId = loginUser && loginUser.id;

  //inPost
  const inPostAlertCount = filterInPostApproveAlert(
    state.inPost.posts,
    loginUserId
  ).length;

  //outpost
  const outPosts = state.outPost.posts;
  const requestAlert_outPosts = filterOutPostRequestAlert(outPosts);
  const returnAlert_outPosts = filterOutPostReturnAlert(outPosts);
  const outPostAlertCount =
    requestAlert_outPosts.length + returnAlert_outPosts.length;

  //connection
  const connectionAlertCount = filterConnectionRequestAlert(
    state.connection.connections
  );
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
