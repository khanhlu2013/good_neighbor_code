import update from "immutability-helper";

export const informAwareApproveInPost_reducerHelper = (state, shareId) => ({
  ...state,
  awaringShareIds: [...state.awaringShareIds, shareId]
});

export const receiveAwareApproveInPost_reducerHelper = (
  state,
  shareId,
  isAwareApprove
) => {
  const { posts } = state;

  const awarePost = posts.find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const awareShare = awarePost.shares.find(share => share.id === shareId);
  const awareShareUpdate = update(awareShare, {
    isAwareApprove: { $set: isAwareApprove }
  });
  const updateShares = [
    ...awarePost.shares.filter(share => share.id !== shareId),
    awareShareUpdate
  ];
  const updatePost = update(awarePost, { shares: { $set: updateShares } });
  const updatePosts = [
    ...posts.filter(post => post.id !== awarePost.id),
    updatePost
  ];

  return {
    ...state,
    posts: updatePosts,
    awaringShareIds: state.awaringShareIds.filter(id => id !== shareId)
  };
};
