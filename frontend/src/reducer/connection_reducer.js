import {
  INFORM_FETCHING_CONNECTIONS,
  RECEIVE_FETCHED_CONNECTIONS
} from "../action/connection_action";

export const calculateConnectionNotification = (connections, loginUserId) => {
  if (!loginUserId) {
    return 0;
  }

  return connections.filter(
    connection =>
      connection.to.id === loginUserId &&
      connection.isApproveByFrom &&
      connection.isApproveByTo === undefined
  ).length;
};

const connectionReducer = (
  state = { connections: [], isFetchingConnections: false },
  action
) => {
  switch (action.type) {
    case INFORM_FETCHING_CONNECTIONS:
      return { ...state, isFetchingConnections: true };

    case RECEIVE_FETCHED_CONNECTIONS:
      return {
        ...state,
        connections: action.connections
      };

    default:
      return state;
  }
};
export default connectionReducer;

/*

  connection = {
    connections : array
    isFetchingConnections : boolean
  }

*/
