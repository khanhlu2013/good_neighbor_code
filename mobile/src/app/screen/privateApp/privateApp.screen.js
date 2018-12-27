import { connect } from "react-redux";

import OutPostSelector from "../../../common/bus/outPost/outPost.selector";
import InPostSelector from "../../../common/bus/inPost/inPost.selector";
import fetchInPosts from "../../../common/bus/inPost/action/fetchInPosts.action";
import fetchOutPosts from "../../../common/bus/outPost/action/fetchOutPosts.action";
import PrivateAppView from "./privateApp.navigator";

const mapStateToProps = (state, ownProps) => ({
  inPostsAlertCount: InPostSelector.approveAlertPosts(state).length,
  outPostsAlertCount:
    OutPostSelector.requestAlertPosts(state).length +
    OutPostSelector.returnAlertPosts(state).length
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPosts: () => dispatch(fetchInPosts()),
  fetchOutPosts: () => dispatch(fetchOutPosts())
});

const PrivateAppScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateAppView);

export default PrivateAppScreen;
