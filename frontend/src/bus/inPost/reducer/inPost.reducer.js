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
import recieveRequetedInPostReducerHelper from "./helper/receiveRequestInPost.reducerHelper";
import recieveUnRequetedInPostReducerHelper from "./helper/receiveUnRequestInPost.reducerHelper";

const defaultInPostState = {
  posts: [],
  requestingPostIds: [],
  deletingShareIds: [],
  isFetchingPosts: false,
  isInitPosts: false
};
const inPostReducer = (state = defaultInPostState, action) => {
  switch (action.type) {
    case INFORM_FETCH_INPOSTS:
      return { ...state, isFetchingPosts: true };

    case RECEIVE_FETCH_INPOSTS:
      const { posts: allPosts } = action;
      const filterDenyPosts = allPosts.filter(inPost =>
        inPost.denyShares.every(
          share => share.borrower.id !== this.props.loginUser.id
        )
      );
      return {
        ...state,
        isFetchingPosts: false,
        isInitPosts: true,
        posts: filterDenyPosts
      };

    case INFORM_REQUEST_INPOST:
      return {
        ...state,
        requestingPostIds: [...state.requestingPostIds, action.postId]
      };

    case INFORM_UNREQUEST_INPOST:
      return {
        ...state,
        deletingShareIds: [...state.deletingShareIds, action.shareId]
      };

    case RECEIVE_REQUEST_INPOST:
      return recieveRequetedInPostReducerHelper(
        state,
        action.postId,
        action.shareId,
        action.shareDateCreate,
        action.loginUser
      );

    case RECEIVE_UNREQUEST_INPOST:
      return recieveUnRequetedInPostReducerHelper(state, action.shareId);

    default:
      return state;
  }
};
export default inPostReducer;
