import {
  informFetchOutPosts_reducerHelper,
  receiveFetchOutPosts_reducerHelper
} from "./helper/fetchOutPosts.reducerHelper";
import {
  INFORM_CRUDE_POST,
  RECIEVE_UPDATE_POST,
  RECEIVE_CREATE_POST,
  EXECUTE_CANCEL_CRUD_POST_DIALOG,
  OPEN_UPDATE_POST_DIALOG,
  OPEN_CREATE_POST_DIALOG
} from "../action/crudOutPost.action";
import {
  informCrudPost_reducerHelper,
  receiveCreatePost_reducerHelper,
  receiveUpdatePost_reducerHelper
} from "./helper/crudPost.reducerHelper";
import {
  OPEN_DECISION_DIALOG,
  INFORM_DECIDE_POST,
  EXIT_DECISION_DIALOG,
  RECEIVE_DECIDE_POST
} from "../action/decideOutPost.action";
import {
  INFORM_AWARE_RETURN_POST,
  RECEIVE_AWARE_RETURN_POST
} from "../action/awareReturnPost.action";
import { receiveDecidePost_reducerHelper } from "./helper/decidePost.reducerHelper";
import {
  INFORM_FETCH_OUTPOSTS,
  RECEIVE_FETCH_OUTPOSTS
} from "../action/fetchOutPosts.action";

const defaultState = {
  posts: [],
  isInitPosts: false,
  isFetchingPosts: false,
  crud: {
    crudPostDialogPrefill: null,
    isCrudingPost: false,
    isOpenCrudDialog: false
  },
  decide: {
    curDecidePost: null,
    isDecidingPost: false,
    isOpenDecisionDialog: false
  },
  awaringReturnPostIds: []
};
const outPostReducer = (state = defaultState, action) => {
  switch (action.type) {
    //fetch
    case INFORM_FETCH_OUTPOSTS:
      return informFetchOutPosts_reducerHelper(state);
    case RECEIVE_FETCH_OUTPOSTS:
      return receiveFetchOutPosts_reducerHelper(state, action.posts);
    //crud
    case OPEN_UPDATE_POST_DIALOG:
      return {
        ...state,
        crud: {
          crudPostDialogPrefill: action.post,
          isCrudingPost: false,
          isOpenCrudDialog: true
        }
      };
    case OPEN_CREATE_POST_DIALOG:
      return {
        ...state,
        crud: {
          crudPostDialogPrefill: null,
          isCrudingPost: false,
          isOpenCrudDialog: true
        }
      };
    case EXECUTE_CANCEL_CRUD_POST_DIALOG:
      return {
        ...state,
        crud: {
          ...state.crud,
          isOpenCrudDialog: false
        }
      };
    case INFORM_CRUDE_POST:
      return informCrudPost_reducerHelper(state);
    case RECIEVE_UPDATE_POST:
      return receiveUpdatePost_reducerHelper(
        state,
        action.postId,
        action.updatedTitle,
        action.updatedDescription,
        action.updatedIsActive
      );
    case RECEIVE_CREATE_POST:
      return receiveCreatePost_reducerHelper(state, action.post);

    //decide
    case OPEN_DECISION_DIALOG:
      return {
        ...state,
        decide: {
          ...state.decide,
          curDecidePost: action.post,
          isOpenDecisionDialog: true
        }
      };
    case EXIT_DECISION_DIALOG:
      return {
        ...state,
        decide: {
          ...state.decide,
          isOpenDecisionDialog: false
        }
      };
    case INFORM_DECIDE_POST:
      return {
        ...state,
        decide: {
          ...state.decide,
          isDecidingPost: true
        }
      };
    case RECEIVE_DECIDE_POST:
      return receiveDecidePost_reducerHelper(
        state,
        action.shareId,
        action.resultIsApprove
      );
    //aware return
    case INFORM_AWARE_RETURN_POST:
      return {
        ...state,
        awaringReturnPostIds: [...state.awaringReturnPostIds, action.postId]
      };
    case RECEIVE_AWARE_RETURN_POST:
      return {
        ...state,
        awaringReturnPostIds: state.awaringReturnPostIds.filter(
          post => post.id !== action.postId
        )
      };
    default:
      return state;
  }
};
export default outPostReducer;
