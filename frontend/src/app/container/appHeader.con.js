import { connect } from "react-redux";

import { calculateConnectionNotification } from "../../reducer/connection_reducer";
import { calculateOutPostNotification } from "../../reducer/outPost_reducer";
import { changeAppTab } from "../action/selectAppTab.action";
import AppHeaderComponent from "../component/header/appHeader";
import { filterInPostApproveAlert } from "../../bus/inPost/reducer/inPost.reducer";

const mapStateToProps = (state, ownProps) => {
  const { loginUser, isCheckingAuth } = state.auth;
  const loginUserId = loginUser && loginUser.id;
  return {
    loginUser,
    isCheckingAuth,
    selectAppTab: state.selectAppTab,
    inPostNoteCount: filterInPostApproveAlert(state.inPost.posts, loginUserId)
      .length,
    outPostNoteCount: calculateOutPostNotification(
      state.outPost.posts,
      loginUserId
    ),
    connectionNoteCount: calculateConnectionNotification(
      state.connection.connections
    )
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
