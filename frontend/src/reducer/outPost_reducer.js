import {
  INFORM_FETCHING_OUTPOSTS,
  RECEIVE_FETCHED_OUTPOSTS
} from "../action/outPost_action";

export const calculateOutPostRequestNotification = posts =>
  posts.filter(post => post.isNote_requestWithNoBorrow).length;

export const calculateOutPostUnAwareReturnNotification = posts =>
  posts.filter(post => post.unawareReturnShareLatest).length;

export const calculateOutPostNotification = posts =>
  calculateOutPostUnAwareReturnNotification(posts) +
  calculateOutPostRequestNotification(posts);

const outPostReducer = (
  state = { posts: [], isFetchingPosts: false },
  action
) => {
  switch (action.type) {
    case INFORM_FETCHING_OUTPOSTS:
      return { ...state, isFetchingPosts: true };

    case RECEIVE_FETCHED_OUTPOSTS:
      return {
        ...state,
        posts: action.posts
      };

    default:
      return state;
  }
};
export default outPostReducer;

/*

  inPost = {
    posts : array
    isFetchingPosts : boolean
  }

*/
