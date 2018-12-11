import update from "immutability-helper";

export const informUnRequestInPost_reducerHelper = (state, shareId) => ({
  ...state,
  deletingShareIds: [...state.deletingShareIds, shareId]
});

export const recieveUnRequetedInPost_reducerHelper = (state, shareId) => {
  const { posts } = state;
  const unRequestPost = posts.find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const unRequestShareIndex = unRequestPost.shares.findIndex(
    share => share.id === shareId
  );
  const unRequestPostUpdate = update(unRequestPost, {
    shares: { $splice: [[unRequestShareIndex, 1]] }
  });

  const updatePosts = [
    ...posts.filter(post => post.id !== unRequestPostUpdate.id),
    unRequestPostUpdate
  ];

  return {
    ...state,
    deletingShareIds: state.deletingShareIds.filter(id => id !== shareId),
    posts: updatePosts
  };
};
