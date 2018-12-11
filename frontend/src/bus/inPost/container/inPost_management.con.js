import { connect } from "react-redux";
import InPostManagementComponent from "../component/inPost_management";
import InPostSelector from "../inPost.selector";
import fetchInPosts from "@gn/common/bus/inPost/action/fetchInPosts.action";

export const mapStateToProps = (state, ownProps) => {
  return {
    posts: InPostSelector.posts(state),
    isFetchingPosts: InPostSelector.isFetchingPosts(state),
    isInitPosts: InPostSelector.isInitPosts(state),
    //calculate data
    requestPosts: InPostSelector.requestPosts(state),
    borrowPosts: InPostSelector.borrowPosts(state),
    approveAlertPosts: InPostSelector.approveAlertPosts(state),
    returnShares: InPostSelector.returnShares(state)
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPosts: () => dispatch(fetchInPosts())
});

const InPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostManagementComponent);

export default InPostManagementContainer;
