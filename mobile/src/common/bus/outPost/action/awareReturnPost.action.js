import API from "../../../api";

export const INFORM_AWARE_RETURN_POST = "INFORM_AWARE_RETURN_POST";
export const RECEIVE_AWARE_RETURN_POST = "RECEIVE_AWARE_RETURN_POST";

export const awareReturnPost = postId => (dispatch, getState) => {
  dispatch({ type: INFORM_AWARE_RETURN_POST, postId });

  API.awareReturnPost(postId).then(() =>
    dispatch({ type: RECEIVE_AWARE_RETURN_POST, postId })
  );
};
