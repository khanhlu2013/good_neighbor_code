import API from "@gn/common/api";

export const INFORM_UNREQUEST_INPOST = "INFORM_UNREQUEST_INPOST";
export const RECEIVE_UNREQUEST_INPOST = "RECEIVE_UNREQUEST_INPOST";

const unRequestInPost = shareId => (dispatch, getState) => {
  dispatch({
    type: INFORM_UNREQUEST_INPOST,
    shareId
  });
  return API.deleteShare(shareId).then(() =>
    dispatch({
      type: RECEIVE_UNREQUEST_INPOST,
      shareId
    })
  );
};
export default unRequestInPost;
