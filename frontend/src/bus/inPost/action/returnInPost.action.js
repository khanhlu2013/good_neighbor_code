import API from "@gn/common/api";

export const INFORM_RETURN_INPOST = "INFORM_RETURN_INPOST";
export const RECEIVE_RETURN_INPOST = "RECEIVE_RETURN_INPOST";

const returnInPost = shareId => (dispatch, getState) => {
  dispatch({
    type: INFORM_RETURN_INPOST,
    shareId
  });

  return API.returnShare(shareId).then(
    ({ resultIsReturnByTo, resultDateReturn }) => {
      dispatch({
        type: RECEIVE_RETURN_INPOST,
        shareId,
        resultIsReturnByTo,
        resultDateReturn
      });
    }
  );
};

export default returnInPost;
