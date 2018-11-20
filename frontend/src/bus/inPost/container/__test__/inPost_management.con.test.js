import React from "react";
import { mapStateToProps, mapDispatchToProps } from "../inPost_management.con";
import InPostSelector from "../../inPost.selector";
import * as FetchInPostsWrap from "../../action/fetchInPosts.action";

describe("inPost_management container", () => {
  it("on connect with redux -> can match state to props", () => {
    const state = "stateFake";
    const posts = "postsFake";
    const isFetchingPosts = "isFetchingPostsFake";
    const isInitPosts = "isInitPostsFake";
    const requestPosts = "requestPostsFake";
    const borrowPosts = "borrowPostsFake";
    const approveAlertPosts = "approveAlertPostsFake";
    const returnShares = "returnSharesFake";

    jest.spyOn(InPostSelector, "posts").mockReturnValueOnce(posts);
    jest
      .spyOn(InPostSelector, "isFetchingPosts")
      .mockReturnValueOnce(isFetchingPosts);
    jest.spyOn(InPostSelector, "isInitPosts").mockReturnValueOnce(isInitPosts);

    jest
      .spyOn(InPostSelector, "requestPosts")
      .mockReturnValueOnce(requestPosts);
    jest.spyOn(InPostSelector, "borrowPosts").mockReturnValueOnce(borrowPosts);
    jest
      .spyOn(InPostSelector, "approveAlertPosts")
      .mockReturnValueOnce(approveAlertPosts);
    jest
      .spyOn(InPostSelector, "returnShares")
      .mockReturnValueOnce(returnShares);

    const result = mapStateToProps(state);
    expect(result).toEqual({
      posts,
      isFetchingPosts,
      isInitPosts,
      requestPosts,
      borrowPosts,
      approveAlertPosts,
      returnShares
    });
  });

  it("on connect with redux -> can match dispatch to props", () => {
    //setup
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const fetchInPostAction = "fetchInPostActionFake";
    jest
      .spyOn(FetchInPostsWrap, "default")
      .mockReturnValueOnce(fetchInPostAction);

    //execute
    result.fetchInPosts();

    //assert
    expect(dispatch).toHaveBeenCalledWith(fetchInPostAction);
  });
});
