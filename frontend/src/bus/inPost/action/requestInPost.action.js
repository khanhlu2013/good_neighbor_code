import API from "../../../api/profile-api";
export const INFORM_REQUESTING_INPOST = "INFORM_REQUESTING_INPOST";
export const RECEIVE_REQUESTED_INPOST = "RECEIVE_REQUESTED_INPOST";

const requestInPost = postId => (dispatch, getState) => {
  dispatch({
    type: INFORM_REQUESTING_INPOST,
    postId
  });

  return API.createShare(postId).then(
    ({ id: shareId, dateCreate: shareDateCreate }) =>
      dispatch({
        type: RECEIVE_REQUESTED_INPOST,
        postId,
        shareId,
        shareDateCreate,
        loginUser: getState().auth.loginUser
      })
  );
};
export default requestInPost;
