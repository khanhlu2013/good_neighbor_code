import AuthSelector from "../../app/selector/auth.selector";
import { inConnectionFilter } from "./connection.filter";

const _connections = state => state.connection.connections;
const _isFetchingConnections = state => state.connection.isFetchingConnections;
const _isInitConnections = state => state.connection.isInitConnections;
const _updatingConnectionIds = state => state.connection.updatingConnectionIds;
const _connectionAlertCount = state => {
  const connections = _connections(state);
  const loginUser = AuthSelector.loginUser(state);

  if (!loginUser) {
    return 0;
  }
  return inConnectionFilter(connections, loginUser.id).length;
};

const ConnectionSelector = {
  //raw data
  connections: _connections,
  isFetchingConnections: _isFetchingConnections,
  isInitConnections: _isInitConnections,
  updatingConnectionIds: _updatingConnectionIds,
  connectionAlertCount: _connectionAlertCount
};

export default ConnectionSelector;
