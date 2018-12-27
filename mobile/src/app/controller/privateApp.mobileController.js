import React, { Component } from "react";
import { connect } from "react-redux";

import OutPostSelector from "../../common/bus/outPost/outPost.selector";
import fetchInPosts from "../../common/bus/inPost/action/fetchInPosts.action";
import fetchOutPosts from "../../common/bus/outPost/action/fetchOutPosts.action";
import InPostSelector from "../../common/bus/inPost/inPost.selector";

class _ extends Component {
  componentDidMount() {
    //eager fetching posts so that we can have its alertCount state to display the drawer menu
    const { fetchInPosts, fetchOutPosts } = this.props;
    fetchInPosts();
    fetchOutPosts();
  }

  render() {
    const { props } = this;
    const { view } = props;
    return React.createElement(view, props);
  }
}

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

const PrivateAppMobileController = connect(
  mapStateToProps,
  mapDispatchToProps
)(_);

export default PrivateAppMobileController;
