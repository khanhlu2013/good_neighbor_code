import {
  mapStateToProps,
  mapDispatchToProps
} from "../inPostItem_foot_shop.con";
import InPostSelector from "../../../inPost.selector";

import * as RequestInPostActionModule from "../../../action/requestInPost.action";

describe("inPostItem_foot_shop container", () => {
  it("can match state to props", () => {
    const postId = "postIdStub";
    const ownProps = { postId };
    const state = "stateStub";
    const isRequestingPostResult = "isRequestingPostSub";

    const mockFn = jest.fn();
    InPostSelector.isRequestingPost = mockFn;
    mockFn.mockReturnValue(isRequestingPostResult);

    // i want to program InPostSelector.isRequestingPost fn to return a predefine value.
    const props = mapStateToProps(state, ownProps);

    //check postId
    expect(props.postId).toBe(postId);

    //check isRequestingPost
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(state, postId);
    expect(props.isRequestingPost).toBe(isRequestingPostResult);
  });

  it("can match dispatch to props", () => {
    const requestInPostAction = "requestInPostActionStub";
    jest.spyOn(RequestInPostActionModule, "default");
    RequestInPostActionModule.default.mockReturnValue(requestInPostAction);

    //create a dispatch mock
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const postId = "postIdStub";
    props.onRequestPost(postId);

    expect(RequestInPostActionModule.default).toHaveBeenCalledWith(postId);
    expect(dispatch).toHaveBeenCalledWith(requestInPostAction);
  });
});
