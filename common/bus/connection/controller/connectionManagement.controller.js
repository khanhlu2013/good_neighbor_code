import React, { Component } from "react";
import { connect } from "react-redux";

import fetchConnections from "../action/fetchConnection.action";
import createConnection from "../action/createConnection.action";
import updateConnection from "../action/updateConnection.action";
import AuthSelector from "../../../app/selector/auth.selector";
import ConnectionSelector from "../connection.selector";

class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingConnection: false
    };
    this.onCreateConnection = this.onCreateConnection.bind(this);
  }
  componentDidMount() {
    this.props.fetchConnections();
  }

  onCreateConnection(...args) {
    this.setState({ isCreatingConnection: true }, async () => {
      await this.props.onCreateConnection(...args);
      this.setState({ isCreatingConnection: false });
    });
  }

  render() {
    return React.createElement(this.props.view, {
      ...this.props,
      onCreateConnection: this.onCreateConnection,
      isCreatingConnection: this.state.isCreatingConnection
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginUser: AuthSelector.loginUser(state),
    isFetchingConnections: ConnectionSelector.isFetchingConnections(state),
    isInitConnections: ConnectionSelector.isInitConnections(state),
    connections: ConnectionSelector.connections(state),
    updatingConnectionIds: ConnectionSelector.updatingConnectionIds(state)
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
