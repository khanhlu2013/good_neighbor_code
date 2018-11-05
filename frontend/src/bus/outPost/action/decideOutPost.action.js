import API from "../../../api/profile-api";

//DECIDE
export const OPEN_DECISION_DIALOG = "OPEN_DECISION_DIALOG";
export const EXIT_DECISION_DIALOG = "EXIT_DECISION_DIALOG";
export const INFORM_DECIDE_POST = "INFORM_DECIDE_POST";
export const RECEIVE_DECIDE_POST = "RECEIVE_DECIDE_POST";

export const openDecisionDialog = post => ({
  type: OPEN_DECISION_DIALOG,
  post
});
export const exitDecisionDialog = () => ({
  type: EXIT_DECISION_DIALOG
});
export const decideShare = (shareId, isApprove) => (dispatch, getState) => {
  _setIsApprove(dispatch, getState, shareId, isApprove);
};
export const undoDenyShare = shareId => (dispatch, getState) => {
  _setIsApprove(dispatch, getState, shareId, undefined);
};
export const undoApproveShare = shareId => (dispatch, getState) => {
  _setIsApprove(dispatch, getState, shareId, undefined);
};

function _setIsApprove(dispatch, getState, shareId, isApprove) {
  dispatch({ type: INFORM_DECIDE_POST });
  API.approveShare(shareId, isApprove).then(resultIsApprove => {
    dispatch({ type: RECEIVE_DECIDE_POST, shareId, resultIsApprove });
  });
}
