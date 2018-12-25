import React, { Component } from "react";
import connect from "react-redux/lib/connect/connect";

import { fetchOutPosts } from "../action/fetchOutPosts.action";
import { createOrUpdatePost } from "../action/crudOutPost.action";
import {
  decideShare,
  undoDenyShare,
  undoApproveShare
} from "../action/decideOutPost.action";
import { awareReturnPost } from "../action/awareReturnPost.action";
import OutPostSelector from "../outPost.selector";

class _ extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return React.createElement(this.props.view, this.props);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //raw data
    posts: OutPostSelector.posts(state),
    isInitPosts: OutPostSelector.isInitPosts(state),
    isFetchingPosts: OutPostSelector.isFetchingPosts(state),
    awaringReturnPostIds: OutPostSelector.awaringReturnPostIds(state),

    //derived data
    requestAlertPosts: OutPostSelector.requestAlertPosts(state),
    borrowPosts: OutPostSelector.borrowPosts(state),
    returnAlertPosts: OutPostSelector.returnAlertPosts(state),
    returnShares: OutPostSelector.returnShares(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  //fetch posts
  fetchPosts: () => dispatch(fetchOutPosts()),

  //crud
  onCreateOrUpdatePost: (postId, title, description, isActive) =>
    dispatch(createOrUpdatePost(postId, title, description, isActive)),

  //decide
  onDecideShare: (shareId, isApprove) =>
    dispatch(decideShare(shareId, isApprove)),
  onUndoDenyShare: shareId => dispatch(undoDenyShare(shareId)),
  onUndoApproveShare: shareId => dispatch(undoApproveShare(shareId)),

  //aware return post
  onAwareReturnPost: postId => dispatch(awareReturnPost(postId))
});

const OutPostManagementController = connect(
  mapStateToProps,
  mapDispatchToProps
)(_);
export default OutPostManagementController;
