import { API } from "../api/profile-api";

export const INFORM_FETCHING_INPOSTS = "INFORM_FETCHING_INPOSTS";
export const INFORM_REQUESTING_INPOST = "INFORM_REQUESTING_INPOST";
export const INFORM_UNREQUEST_INPOST = "INFORM_UNREQUEST_INPOST";
export const INFORM_AWARE_APPROVE_INPOST = "INFORM_AWARE_APPROVE_INPOST";

export const RECEIVE_FETCHED_INPOSTS = "RECEIVE_FETCHED_INPOSTS";
export const RECEIVE_REQUESTED_INPOST = "RECEIVE_REQUESTED_INPOST";
export const RECEIVE_UNREQUEST_INPOST = "RECEIVE_UNREQUEST_INPOST";
export const RECEIVE_AWARE_APPROVE_INPOST = "RECEIVE_AWARE_APPROVE_INPOST";

export const requestInPost = postId => (dispatch, getState) => {
  dispatch(_informRequestingInPost(postId));
  return API.createShare(postId).then(
    ({ id: shareId, dateCreate: shareDateCreate }) => {
      dispatch(
        _receiveRequestedPost(
          postId,
          shareId,
          shareDateCreate,
          getState().auth.loginUser
        )
      );
    }
  );
};

export const unRequestInPost = shareId => (dispatch, getState) => {
  dispatch(_informUnRequestInPost(shareId));
  return API.deleteShare(shareId).then(() => {
    dispatch(_receiveUnRequestInPost(shareId));
  });
};

export const fetchInPosts = () => (dispatch, getState) => {
  dispatch(_informFetchingInPosts());
  API.inPosts().then(posts => dispatch(_recieveFetchedInPosts(posts)));
};

const _informFetchingInPosts = () => ({
  type: INFORM_FETCHING_INPOSTS
});
const _informRequestingInPost = postId => ({
  type: INFORM_REQUESTING_INPOST,
  postId
});

const _informUnRequestInPost = shareId => ({
  type: INFORM_UNREQUEST_INPOST,
  shareId
});

const _recieveFetchedInPosts = posts => ({
  type: RECEIVE_FETCHED_INPOSTS,
  posts
});
const _receiveRequestedPost = (
  postId,
  shareId,
  shareDateCreated,
  loginUser
) => ({
  type: RECEIVE_REQUESTED_INPOST,
  postId,
  shareId,
  shareDateCreated,
  loginUser
});
const _receiveUnRequestInPost = shareId => ({
  type: RECEIVE_UNREQUEST_INPOST,
  shareId
});
