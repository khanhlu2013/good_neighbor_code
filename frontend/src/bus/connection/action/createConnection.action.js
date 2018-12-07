import API from "@gn/common/api";
import fetchInPosts from "../../inPost/action/fetchInPosts.action";

export const INFORM_CREATE_CONNECTION = "INFORM_CREATE_CONNECTION";
export const RECEIVE_CREATE_CONNECTION = "RECEIVE_CREATE_CONNECTION";

const createConnection = userIdToAdd => (dispatch, getState) => {
  dispatch({ type: INFORM_CREATE_CONNECTION });

  API.createConnection(userIdToAdd).then(connection => {
    dispatch({ type: RECEIVE_CREATE_CONNECTION, connection });
    dispatch(fetchInPosts());
  });
};

export default createConnection;
