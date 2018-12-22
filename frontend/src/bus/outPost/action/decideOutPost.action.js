import API from "@gn/common/api";

//DECIDE
export const OPEN_DECISION_DIALOG = "OPEN_DECISION_DIALOG";
export const RECEIVE_DECIDE_POST = "RECEIVE_DECIDE_POST";

export const openDecisionDialog = post => ({
  type: OPEN_DECISION_DIALOG,
  post
});

export const decideShare = (shareId, isApprove) => (dispatch, getState) =>
  _setIsApprove(dispatch, getState, shareId, isApprove);

export const undoDenyShare = shareId => (dispatch, getState) =>
  _setIsApprove(dispatch, getState, shareId, undefined);

export const undoApproveShare = shareId => (dispatch, getState) =>
  _setIsApprove(dispatch, getState, shareId, undefined);

const _setIsApprove = (dispatch, getState, shareId, isApprove) =>
  API.approveShare(shareId, isApprove).then(resultIsApprove => {
    dispatch({ type: RECEIVE_DECIDE_POST, shareId, resultIsApprove });
    return { shareId, resultIsApprove };
  });
