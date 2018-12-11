import update from "immutability-helper";

export const informReturnInPost = (state, shareId) => ({
  ...state,
  returningShareIds: [...state.returningShareIds, shareId]
});

export const receiveReturnInPost = (
  state,
  shareId,
  resultIsReturnByTo,
  resultDateReturn
) => {
  const { posts } = state;
  const returnPost = posts.find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const returnShare = returnPost.shares.find(share => share.id === shareId);
  const updateReturnShare = update(returnShare, {
    isReturn: { $set: resultIsReturnByTo },
    dateReturn: { $set: resultDateReturn }
  });
  const updateShares = [
    ...returnPost.shares.filter(share => share.id !== shareId),
    updateReturnShare
  ];
  const updateReturnPost = update(returnPost, {
    shares: { $set: updateShares }
  });
  const updatePosts = [
    ...posts.filter(post => post.id !== returnPost.id),
    updateReturnPost
  ];

  return {
    ...state,
    posts: updatePosts,
    returningShareIds: state.returningShareIds.filter(id => id !== shareId)
  };
};
