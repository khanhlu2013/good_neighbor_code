import API from "@gn/common/api";

export const INFORM_AWARE_APPROVE_INPOST = "INFORM_AWARE_APPROVE_INPOST";
export const RECEIVE_AWARE_APPROVE_INPOST = "RECEIVE_AWARE_APPROVE_INPOST";

const awareApproveInPost = shareId => (dispatch, getState) => {
  dispatch({
    type: INFORM_AWARE_APPROVE_INPOST,
    shareId
  });

  return API.awareApproveShare(shareId).then(isAwareApprove => {
    dispatch({
      type: RECEIVE_AWARE_APPROVE_INPOST,
      shareId,
      isAwareApprove
    });
  });
};

export default awareApproveInPost;
