import API from "@gn/common/api";
import AuthSelector from "../../../app/auth.selector";

export const INFORM_FETCH_INPOSTS = "INFORM_FETCH_INPOSTS";
export const RECEIVE_FETCH_INPOSTS = "RECEIVE_FETCH_INPOSTS";

const fetchInPosts = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_FETCH_INPOSTS
  });
  return API.inPosts().then(posts =>
    dispatch({
      type: RECEIVE_FETCH_INPOSTS,
      posts,
      loginUserId: AuthSelector.loginUser(getState()).id
    })
  );
};
export default fetchInPosts;
