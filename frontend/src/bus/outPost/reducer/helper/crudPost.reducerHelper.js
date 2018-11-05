import update from "immutability-helper";

export const informCrudPost_reducerHelper = state => ({
  ...state,
  crud: {
    ...state.crud,
    isCrudingPost: true
  }
});

export const receiveUpdatePost_reducerHelper = (
  state,
  postId,
  updatedTitle,
  updatedDescription,
  updatedIsActive
) => {
  const { posts } = state;
  const curPost = posts.find(post => post.id === postId);

  const curPostUpdate = update(curPost, {
    title: { $set: updatedTitle },
    description: { $set: updatedDescription },
    isActive: { $set: updatedIsActive }
  });

  return {
    ...state,
    posts: [...posts.filter(post => post.id !== postId), curPostUpdate],
    crud: {
      crudPostDialogPrefill: null,
      isCrudingPost: false,
      isOpenCrudDialog: false
    }
  };
};

export const receiveCreatePost_reducerHelper = (state, post) => {
  return {
    ...state,
    posts: [...state.posts, post],
    crud: {
      crudPostDialogPrefill: null,
      isCrudingPost: false,
      isOpenCrudDialog: false
    }
  };
};
