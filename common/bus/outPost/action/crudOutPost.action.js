import API from "../../../api";
import Post from "../../../model/post";

//CRUD
export const RECIEVE_UPDATE_POST = "RECIEVE_UPDATE_POST";
export const RECEIVE_CREATE_POST = "RECEIVE_CREATE_POST";

export const createOrUpdatePost = (postId, title, description, isActive) => (
  dispatch,
  getState
) => {
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
