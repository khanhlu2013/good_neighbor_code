import { connect } from "react-redux";
import ConnectionManagementComponent from "./component/connection_management";
import fetchConnections from "./action/fetchConnection.action";
import createConnection from "./action/createConnection.action";
import updateConnection from "./action/updateConnection.action";

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
const ConnectionManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionManagementComponent);
export default ConnectionManagementContainer;
