export const informFetchOutPosts_reducerHelper = state => ({
  ...state,
  isFetchingPosts: true
});

export const receiveFetchOutPosts_reducerHelper = (state, posts) => ({
  ...state,
  isInitPosts: true,
  isFetchingPosts: false,
  posts
});
