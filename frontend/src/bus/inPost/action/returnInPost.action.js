import API from "../../../api/profile-api";

export const INFORM_RETURN_INPOST = "INFORM_RETURN_INPOST";
export const RECEIVE_RETURN_INPOST = "RECEIVE_RETURN_INPOST";

const returnInPost = shareId => (dispatch, getState) => {
  const posts = getState().inPost.posts;
  const returnPost = posts.find(post =>
    post.shares.some(share => share.id === shareId)
  );

  if (
    !window.confirm(
      `You are returning '${returnPost.title}'. This can not be undo!`
    )
  ) {
    return;
  }

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
