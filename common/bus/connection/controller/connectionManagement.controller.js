import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import fetchConnections from "../action/fetchConnection.action";
import createConnection from "../action/createConnection.action";
import updateConnection from "../action/updateConnection.action";
import AuthSelector from "../../../app/selector/auth.selector";
import ConnectionSelector from "../connection.selector";

class _ extends Component {
  componentDidMount() {
    this.props.fetchConnections();
  }

  render() {
    const { view } = this.props;

    return React.createElement(
      view,
      this.props //navigation_obj and redux_connection
    );
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
ConnectionManagementController.propTypes = {
  view: PropTypes.func.isRequired
};
export default ConnectionManagementController;
