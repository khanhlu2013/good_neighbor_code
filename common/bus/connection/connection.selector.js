const _connections = state => state.connection.connections;
const _isFetchingConnections = state => state.connection.isFetchingConnections;
const _isInitConnections = state => state.connection.isInitConnections;
const _updatingConnectionIds = state => state.connection.updatingConnectionIds;

const ConnectionSelector = {
  //raw data
  connections: _connections,
  isFetchingConnections: _isFetchingConnections,
  isInitConnections: _isInitConnections,
  updatingConnectionIds: _updatingConnectionIds
};

export default ConnectionSelector;
