import API from "../../../api/profile-api";

export const INFORM_FETCH_INPOSTS = "INFORM_FETCH_INPOSTS";
export const RECEIVE_FETCH_INPOSTS = "RECEIVE_FETCH_INPOSTS";

const fetchInPosts = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_FETCH_INPOSTS
  });
  API.inPosts().then(posts =>
    dispatch({
      type: RECEIVE_FETCH_INPOSTS,
      posts,
      loginUserId: getState().auth.loginUser.id
    })
  );
};
export default fetchInPosts;
