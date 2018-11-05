import update from "immutability-helper";

import Share from "../../../../model/share";

export const informRequestInPost_reducerHelper = (state, postId) => ({
  ...state,
  requestingPostIds: [...state.requestingPostIds, postId]
});

export const recieveRequestInPost_reducerHelper = (
  state,
  postId,
  shareId,
  shareDateCreate,
  loginUser
) => {
  const { posts } = state;
  const newShare = new Share(
    shareId,
    loginUser,
    new Date(shareDateCreate),
    undefined, //isApprove,
    false, //isAwareApprove,
    false, //isReturn,
    false, //isAwareReturn,
    null, //dateReturn
    null //post to be set later
  );

  const curPost = posts.find(post => post.id === postId);
  const updateCurPost = update(curPost, { shares: { $push: [newShare] } });
  newShare.post = updateCurPost;

  const newPosts = [...posts.filter(post => post.id !== postId), updateCurPost];

  return {
    ...state,
    posts: newPosts,
    requestingPostIds: state.requestingPostIds.filter(id => id !== postId)
  };
};
