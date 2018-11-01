import API from "../api/profile-api";

export const INFORM_FETCHING_CONNECTIONS = "INFORM_FETCHING_CONNECTIONS";
export const RECEIVE_FETCHED_CONNECTIONS = "RECEIVE_FETCHED_CONNECTIONS";

export const fetchConnections = () => (dispatch, getState) => {
  dispatch(_informFetchingConnection());
  API.connections().then(connections =>
    dispatch(_recieveFetchedConnections(connections))
  );
};

const _informFetchingConnection = () => ({
  type: INFORM_FETCHING_CONNECTIONS
});

const _recieveFetchedConnections = connections => ({
  type: RECEIVE_FETCHED_CONNECTIONS,
  connections
});
