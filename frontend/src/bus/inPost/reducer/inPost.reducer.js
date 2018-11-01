import update from "immutability-helper";

import Share from "../../../model/share";
import {
  INFORM_REQUESTING_INPOST,
  RECEIVE_REQUESTED_INPOST
} from "../action/requestInPost.action";
import {
  RECEIVE_UNREQUEST_INPOST,
  INFORM_UNREQUEST_INPOST
} from "../action/unRequestInPost.action";
import {
  INFORM_FETCHING_INPOSTS,
  RECEIVE_FETCHED_INPOSTS
} from "../action/fetchInPosts.action";

export const filterInPostApproveAlert = (posts, loginUserId) => {
  if (!loginUserId) {
    return [];
  }

  return posts.filter(post =>
    post.shares.some(
      share =>
        share.borrower.id === loginUserId &&
        share.isApprove === true &&
        share.isAwareApprove === false &&
        share.isReturn === false
    )
  );
};

const inPostReducer = (
  state = {
    posts: [],
    requestingPostIds: [],
    deletingShareIds: [],
    isFetchingPosts: false,
    isInitPosts: false
  },
  action
) => {
  switch (action.type) {
    case INFORM_FETCHING_INPOSTS:
      return { ...state, isFetchingPosts: true };

    case RECEIVE_FETCHED_INPOSTS:
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

    case INFORM_REQUESTING_INPOST:
      return {
        ...state,
        requestingPostIds: [...state.requestingPostIds, action.postId]
      };

    case INFORM_UNREQUEST_INPOST:
      return {
        ...state,
        deletingShareIds: [...state.deletingShareIds, action.shareId]
      };

    case RECEIVE_REQUESTED_INPOST: {
      const { postId } = action;
      const newShare = new Share(
        action.shareId,
        action.loginUser,
        new Date(action.shareDateCreated),
        undefined, //isApprove,
        false, //isAwareApprove,
        false, //isReturn,
        false, //isAwareReturn,
        null, //dateReturn
        null //post to be set later
      );

      const curPost = state.posts.find(post => post.id === postId);
      const newCurPost = update(curPost, { shares: { $push: [newShare] } });
      newShare.post = newCurPost;

      const newPosts = [
        ...state.posts.filter(post => post.id !== postId),
        newCurPost
      ];

      return {
        ...state,
        posts: newPosts,
        requestingPostIds: state.requestingPostIds.filter(id => id !== postId)
      };
    }

    case RECEIVE_UNREQUEST_INPOST: {
      const { shareId } = action;
      const { posts } = state;
      const curPost = posts.find(post =>
        post.shares.some(share => share.id === shareId)
      );
      const index = curPost.shares.findIndex(share => share.id === shareId);
      const curPostUpdated = update(curPost, {
        shares: { $splice: [[index, 1]] }
      });

      const newPosts = [
        ...posts.filter(post => post.id !== curPostUpdated.id),
        curPostUpdated
      ];

      return {
        ...state,
        deletingShareIds: state.deletingShareIds.filter(id => id !== shareId),
        posts: newPosts
      };
    }

    default:
      return state;
  }
};
export default inPostReducer;

/*

  inPost = {
    isInitPosts = fase : boolean
    isFetchingPosts = false : boolean
    posts = [] : array
  }

  . isInitPost

. 


*/
