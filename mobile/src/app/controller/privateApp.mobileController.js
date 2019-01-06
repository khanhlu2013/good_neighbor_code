import React, { Component } from "react";
import { connect } from "react-redux";
import AuthSelector from "@gn/common/app/selector/auth.selector";
import ConnectionSelector from "@gn/common/bus/connection/connection.selector";
import { inConnectionFilter } from "@gn/common/bus/connection/connection.filter";

import OutPostSelector from "@gn/common/bus/outPost/outPost.selector";
import fetchInPosts from "@gn/common/bus/inPost/action/fetchInPosts.action";
import fetchOutPosts from "@gn/common/bus/outPost/action/fetchOutPosts.action";
import fetchConnections from "@gn/common/bus/connection/action/fetchConnection.action";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

class _ extends Component {
  componentDidMount() {
    //eager fetching posts so that we can have its alertCount state to display the drawer menu
    const { fetchInPosts, fetchOutPosts, fetchConnections } = this.props;
    fetchInPosts();
    fetchOutPosts();
    fetchConnections();
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
    OutPostSelector.returnAlertPosts(state).length,
  connectionAlertCount: inConnectionFilter(
    ConnectionSelector.connections(state),
    AuthSelector.loginUser(state).id
  ).length
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPosts: () => dispatch(fetchInPosts()),
  fetchOutPosts: () => dispatch(fetchOutPosts()),
  fetchConnections: () => dispatch(fetchConnections())
});

const PrivateAppMobileController = connect(
  mapStateToProps,
  mapDispatchToProps
)(_);

export default PrivateAppMobileController;
