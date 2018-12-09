import {
  INFORM_REQUEST_INPOST,
  RECEIVE_REQUEST_INPOST
} from "../action/requestInPost.action";
import {
  RECEIVE_UNREQUEST_INPOST,
  INFORM_UNREQUEST_INPOST
} from "../action/unRequestInPost.action";
import {
  INFORM_FETCH_INPOSTS,
  RECEIVE_FETCH_INPOSTS
} from "../action/fetchInPosts.action";
import {
  informRequestInPost_reducerHelper,
  recieveRequestInPost_reducerHelper
} from "./helper/requestInPost.reducerHelper";
import {
  RECEIVE_AWARE_APPROVE_INPOST,
  INFORM_AWARE_APPROVE_INPOST
} from "../action/awareApproveInPost.action";
import {
  recieveUnRequetedInPost_reducerHelper,
  informUnRequestInPost_reducerHelper
} from "./helper/unRequestInPost.reducerHelper";
import {
  INFORM_RETURN_INPOST,
  RECEIVE_RETURN_INPOST
} from "../action/returnInPost.action";
import {
  informReturnInPost,
  receiveReturnInPost
} from "./helper/returnInPost.reducerHelper";
import { RECEIVE_LOGGED_OUT_SUCCESS } from "@gn/common/app/action/auth.action";
import update from "immutability-helper";

const defaultInPostState = {
  posts: [],
  isFetchingPosts: false,
  isInitPosts: false,
  requestingPostIds: [],
  deletingShareIds: [],
  awaringShareIds: [],
  returningShareIds: []
};
const inPostReducer = (state = defaultInPostState, action) => {
  switch (action.type) {
    //FETCH
    case INFORM_FETCH_INPOSTS:
      return { ...state, isFetchingPosts: true };

    case RECEIVE_FETCH_INPOSTS:
      const { posts: allPosts } = action;
      const filterDenyPosts = allPosts.filter(inPost =>
        inPost.denyShares.every(
          share => share.borrower.id !== action.loginUserId
        )
      );
      return {
        ...state,
        isFetchingPosts: false,
        isInitPosts: true,
        posts: filterDenyPosts
      };

    //REQUEST
    case INFORM_REQUEST_INPOST:
      return informRequestInPost_reducerHelper(state, action.postId);
    case RECEIVE_REQUEST_INPOST:
      return recieveRequestInPost_reducerHelper(
        state,
        action.postId,
        action.shareId,
        action.shareDateCreate,
        action.loginUser
      );

    //UNREQUEST
    case INFORM_UNREQUEST_INPOST:
      return informUnRequestInPost_reducerHelper(state, action.shareId);
    case RECEIVE_UNREQUEST_INPOST:
      return recieveUnRequetedInPost_reducerHelper(state, action.shareId);

    //AWARE
    case INFORM_AWARE_APPROVE_INPOST:
      return update(state, { awaringShareIds: { $push: [action.shareId] } });

    case RECEIVE_AWARE_APPROVE_INPOST:
      const { shareId, isAwareApprove } = action;
      const postIndex = state.posts.findIndex(post =>
        post.shares.some(share => share.id === shareId)
      );
      const shareIndex = state.posts[postIndex].shares.findIndex(
        share => share.id === shareId
      );

      return update(state, {
        posts: {
          [postIndex]: {
            shares: {
              [shareIndex]: { isAwareApprove: { $set: isAwareApprove } }
            }
          }
        },
        awaringShareIds: {
          $set: state.awaringShareIds.filter(id => id !== shareId)
        }
      });

    //RETURN
    case INFORM_RETURN_INPOST:
      return informReturnInPost(state, action.shareId);
    case RECEIVE_RETURN_INPOST:
      return receiveReturnInPost(
        state,
        action.shareId,
        action.resultIsReturnByTo,
        action.resultDateReturn
      );

    //LOGOUT
    case RECEIVE_LOGGED_OUT_SUCCESS:
      return defaultInPostState;

    default:
      return state;
  }
};
export default inPostReducer;
