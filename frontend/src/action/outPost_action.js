import API from "../api/profile-api";

export const INFORM_FETCHING_OUTPOSTS = "INFORM_FETCHING_OUTPOSTS";
export const RECEIVE_FETCHED_OUTPOSTS = "RECEIVE_FETCHED_OUTPOSTS";

export const fetchOutPosts = () => (dispatch, getState) => {
  dispatch(_informFetchingOutPosts());
  API.outPosts().then(posts => dispatch(_recieveFetchedOutPosts(posts)));
};

const _informFetchingOutPosts = () => ({
  type: INFORM_FETCHING_OUTPOSTS
});

const _recieveFetchedOutPosts = posts => ({
  type: RECEIVE_FETCHED_OUTPOSTS,
  posts
});
