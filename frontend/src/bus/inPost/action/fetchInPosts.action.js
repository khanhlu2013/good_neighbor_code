import API from "../../../api/profile-api";

export const INFORM_FETCHING_INPOSTS = "INFORM_FETCHING_INPOSTS";
export const RECEIVE_FETCHED_INPOSTS = "RECEIVE_FETCHED_INPOSTS";

const fetchInPosts = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_FETCHING_INPOSTS
  });
  API.inPosts().then(posts =>
    dispatch({
      type: RECEIVE_FETCHED_INPOSTS,
      posts
    })
  );
};
export default fetchInPosts;
