import {
  INFORM_FETCH_CONNECTIONS,
  RECEIVE_FETCH_CONNECTIONS
} from "../action/fetchConnection.action";
import {
  INFORM_CREATE_CONNECTION,
  RECEIVE_CREATE_CONNECTION
} from "../action/createConnection.action";
import {
  INFORM_UPDATE_CONNECTION,
  RECIEVE_UPDATE_CONNECTION
} from "../action/updateConnection.action";
import update from "immutability-helper";
import { RECEIVE_LOGGED_OUT_SUCCESS } from "../../../app/action/auth.action";

const defaultState = {
  connections: [],
  isInitConnections: false,
  isFetchingConnections: false,

  //create
  isCreatingConnection: false,

  //update
  updatingConnectionIds: []
};
const connectionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INFORM_FETCH_CONNECTIONS:
      return { ...state, isFetchingConnections: true };

    case RECEIVE_FETCH_CONNECTIONS:
      return {
        ...state,
        connections: action.connections,
        isInitConnections: true,
        isFetchingConnections: false
      };

    case INFORM_CREATE_CONNECTION:
      return {
        ...state,
        isCreatingConnection: true
      };

    case RECEIVE_CREATE_CONNECTION:
      return {
        ...state,
        connections: [...state.connections, action.connection]
      };

    case INFORM_UPDATE_CONNECTION:
      return {
        ...state,
        updatingConnectionIds: [
          ...state.updatingConnectionIds,
          action.connectionId
        ]
      };

    case RECIEVE_UPDATE_CONNECTION: {
      const { connections } = state;
      const { connectionId } = action;
      const curConnection = connections.find(
        connection => connection.id === connectionId
      );
      const updateCurConnection = update(curConnection, {
        isApproveByFrom: { $set: action.updatedApprovedByFrom },
        isApproveByTo: { $set: action.updatedApprovedByTo }
      });
      const updateConnections = [
        ...connections.filter(connection => connection.id !== connectionId),
        updateCurConnection
      ];

      return {
        ...state,
        connections: updateConnections,
        updatingConnectionIds: state.updatingConnectionIds.filter(
          id => id !== connectionId
        )
      };
    }

    case RECEIVE_LOGGED_OUT_SUCCESS:
      return defaultState;

    default:
      return state;
  }
};
export default connectionReducer;
