import API from "@gn/common/api";
import Post from "@gn/common/model/post";

//CRUD
export const OPEN_UPDATE_POST_DIALOG = "OPEN_UPDATE_POST_DIALOG";
export const OPEN_CREATE_POST_DIALOG = "OPEN_CREATE_POST_DIALOG";
export const INFORM_CRUDE_POST = "INFORM_CRUDE_POST";
export const RECIEVE_UPDATE_POST = "RECIEVE_UPDATE_POST";
export const RECEIVE_CREATE_POST = "RECEIVE_CREATE_POST";

export const openUpdatePostDialog = post => ({
  type: OPEN_UPDATE_POST_DIALOG,
  post
});
export const openCreatePostDialog = () => ({
  type: OPEN_CREATE_POST_DIALOG
});

export const executeOkCrudPostDialog = (
  postId,
  title,
  description,
  isActive
) => (dispatch, getState) => {
  dispatch({ type: INFORM_CRUDE_POST });
  if (postId) {
    return API.updatePost(postId, title, description, isActive).then(
      ({ updatedTitle, updatedDescription, updatedIsActive }) => {
        dispatch({
          type: RECIEVE_UPDATE_POST,
          postId,
          updatedTitle,
          updatedDescription,
          updatedIsActive
        });
      }
    );
  } else {
    return API.createPost(title, description, isActive).then(
      ({
        createdId,
        createdIsActive,
        createdTitle,
        createdDescription,
        createdDateCreated
      }) => {
        const post = new Post(
          createdId,
          getState().loginUser,
          createdIsActive,
          createdTitle,
          createdDescription,
          new Date(createdDateCreated),
          []
        );
        dispatch({ type: RECEIVE_CREATE_POST, post });
        return post;
      }
    );
  }
};
