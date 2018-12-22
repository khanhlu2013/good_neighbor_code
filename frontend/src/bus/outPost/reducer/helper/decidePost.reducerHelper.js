import update from "immutability-helper";

export const receiveDecidePost_reducerHelper = (
  state,
  shareId,
  resultIsApprove
) => {
  const { posts } = state;

  const decidePost = posts.find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const decideShare = decidePost.shares.find(share => share.id === shareId);
  const updateDecideShare = update(decideShare, {
    isApprove: { $set: resultIsApprove }
  });
  const updateShares = [
    ...decidePost.shares.filter(share => share.id !== shareId),
    updateDecideShare
  ];
  const updateDecidePost = update(decidePost, {
    shares: { $set: updateShares }
  });
  return {
    ...state,
    posts: [
      ...posts.filter(post => post.id !== updateDecidePost.id),
      updateDecidePost
    ],
    decide: {
      ...state.decide,
      curDecidePost: updateDecidePost
    }
  };
};
