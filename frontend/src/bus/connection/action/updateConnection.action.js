import fetchInPosts from "@gn/common/bus/inPost/action/fetchInPosts.action";
import API from "@gn/common/api";

export const INFORM_UPDATE_CONNECTION = "INFORM_UPDATE_CONNECTION";
export const RECIEVE_UPDATE_CONNECTION = "RECIEVE_UPDATE_CONNECTION";

const updateConnection = (connectionId, isApprove) => (dispatch, getState) => {
  dispatch({ type: INFORM_UPDATE_CONNECTION, connectionId });

  API.updateConnection(connectionId, isApprove).then(
    ({ updatedApprovedByTo, updatedApprovedByFrom }) => {
      dispatch({
        type: RECIEVE_UPDATE_CONNECTION,
        connectionId,
        updatedApprovedByTo,
        updatedApprovedByFrom
      });
      dispatch(fetchInPosts());
    }
  );
};

export default updateConnection;
