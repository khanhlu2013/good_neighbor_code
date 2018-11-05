import API from "../../../api/profile-api";

export const INFORM_FETCH_CONNECTIONS = "INFORM_FETCH_CONNECTIONS";
export const RECEIVE_FETCH_CONNECTIONS = "RECEIVE_FETCH_CONNECTIONS";

const fetchConnections = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_FETCH_CONNECTIONS
  });
  API.connections().then(connections =>
    dispatch({
      type: RECEIVE_FETCH_CONNECTIONS,
      connections
    })
  );
};
export default fetchConnections;
