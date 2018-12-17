import React, { Component } from "react";
import { connect } from "react-redux";
import InPostSelector from "../inPost.selector";
import fetchInPosts from "../action/fetchInPosts.action";

class _ extends Component {
  componentDidMount() {
    this.props.fetchInPosts();
  }

  render() {
    const { props } = this;
    const { view } = props;
    return React.createElement(view, props);
  }
}

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

const InPostManagementController = connect(
  mapStateToProps,
  mapDispatchToProps
)(_);

export default InPostManagementController;
