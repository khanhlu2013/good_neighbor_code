import {
  INFORM_FETCHING_OUTPOSTS,
  RECEIVE_FETCHED_OUTPOSTS
} from "../action/outPost_action";

const defaultState = {
  posts: [],
  isInitPosts: false,
  isFetchingPosts: false
};
const outPostReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INFORM_FETCHING_OUTPOSTS:
      return { ...state, isFetchingPosts: true };

    case RECEIVE_FETCHED_OUTPOSTS:
      return {
        ...state,
        isInitPosts: true,
        posts: action.posts
      };

    default:
      return state;
  }
};
export default outPostReducer;
