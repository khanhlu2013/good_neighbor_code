import {
  INFORM_FETCHING_CONNECTIONS,
  RECEIVE_FETCHED_CONNECTIONS
} from "../action/connection_action";

const defaultState = {
  connections: [],
  isFetchingConnections: false
};
const connectionReducer = (state = defaultState, action) => {
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
