import API from "../../../api";

export const INFORM_FETCH_OUTPOSTS = "INFORM_FETCH_OUTPOSTS";
export const RECEIVE_FETCH_OUTPOSTS = "RECEIVE_FETCH_OUTPOSTS";

export const fetchOutPosts = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_FETCH_OUTPOSTS
  });
  API.outPosts().then(posts =>
    dispatch({
      type: RECEIVE_FETCH_OUTPOSTS,
      posts
    })
  );
};

export default fetchOutPosts;
