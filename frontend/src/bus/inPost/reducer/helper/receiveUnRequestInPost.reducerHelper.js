import update from "immutability-helper";

const recieveUnRequetedInPostReducerHelper = (state, shareId) => {
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

export default recieveUnRequetedInPostReducerHelper;
