import API from "@gn/common/api";
import AuthSelector from "../../../app/auth.selector";
export const INFORM_REQUEST_INPOST = "INFORM_REQUEST_INPOST";
export const RECEIVE_REQUEST_INPOST = "RECEIVE_REQUEST_INPOST";

const requestInPost = postId => (dispatch, getState) => {
  dispatch({
    type: INFORM_REQUEST_INPOST,
    postId
  });

  return API.createShare(postId).then(
    ({ id: shareId, dateCreate: shareDateCreate }) =>
      dispatch({
        type: RECEIVE_REQUEST_INPOST,
        postId,
        shareId,
        shareDateCreate,
        loginUser: AuthSelector.loginUser(getState())
      })
  );
};
export default requestInPost;
