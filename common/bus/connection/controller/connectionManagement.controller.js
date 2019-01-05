import React, { Component } from "react";
import { connect } from "react-redux";

import fetchConnections from "../action/fetchConnection.action";
import createConnection from "../action/createConnection.action";
import updateConnection from "../action/updateConnection.action";

class _ extends Component {
  componentDidMount() {
    this.props.fetchConnections();
  }

  render() {
    return React.createElement(this.props.view, this.props);
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    isFetchingConnections,
    isInitConnections,
    connections,
    isCreatingConnection,
    updatingConnectionIds
  } = state.connection;

  return {
    loginUser: state.auth.loginUser,
    isFetchingConnections,
    isInitConnections,
    connections,
    isCreatingConnection,
    updatingConnectionIds
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchConnections: () => dispatch(fetchConnections()),
  onCreateConnection: userIdToAdd => dispatch(createConnection(userIdToAdd)),
  onUpdateConnection: (connectionId, isApprove) =>
    dispatch(updateConnection(connectionId, isApprove))
});
const ConnectionManagementController = connect(
  mapStateToProps,
  mapDispatchToProps
)(_);
export default ConnectionManagementController;
