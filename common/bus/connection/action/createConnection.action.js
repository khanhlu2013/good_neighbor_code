import fetchInPosts from "../../inPost/action/fetchInPosts.action";
import API from "../../../api";

export const RECEIVE_CREATE_CONNECTION = "RECEIVE_CREATE_CONNECTION";

const createConnection = userIdToAdd => (dispatch, getState) => {
  return API.createConnection(userIdToAdd).then(connection => {
    dispatch({ type: RECEIVE_CREATE_CONNECTION, connection });
    dispatch(fetchInPosts());
  });
};

export default createConnection;
