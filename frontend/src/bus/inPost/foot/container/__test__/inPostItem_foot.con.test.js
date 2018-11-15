import React from "react";
import { mapStateToProps, mapDispatchToProps } from "../inPostItem_foot.con";
import InPostSelector from "../../../inPost.selector";
import AuthSelector from "../../../../../app/auth.selector";

describe("inPostItem_foot container", () => {
  it("can map state to props", () => {
    const state = "stateStub";
    const postId = "postIdStub";
    const ownProps = { postId };
    const post = "postStub";
    const loginUserId = "loginUserIdStub";

    InPostSelector.post = jest.fn().mockReturnValue(post);
    AuthSelector.loginUser = jest.fn().mockReturnValue({ id: loginUserId });

    const props = mapStateToProps(state, ownProps);
    expect(InPostSelector.post).toHaveBeenCalledWith(state, postId);
    expect(props.post).toBe(post);
    expect(props.loginUserId).toBe(loginUserId);
  });

  it("can map dispatch to props", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    expect(props).toEqual({});
  });
});
