import { mapStateToProps, mapDispatchToProps } from "../inPostItem_foot.con";
import InPostSelector from "../../../inPost.selector";
import AuthSelector from "../../../../../app/auth.selector";
import * as helper from "../inPostItem_foot.selector";

describe("inPostItem_foot container", () => {
  it("can map state to props", () => {
    const postId = "postIdStub";
    const state = "stateStub";
    const ownProps = { postId };
    const isActive = "isActiveStub";
    const post = { id: postId, isActive };
    const loginUserId = "loginUserIdStub";
    const loginUser = { id: loginUserId };
    const myRequestShareId = "myRequestShareIdStub";
    const myBorrowShareId = "myBorrowShareIdStub";
    const userBorrowShare = { id: myBorrowShareId };
    const userRequestShare = { id: myRequestShareId };

    jest.spyOn(InPostSelector, "post").mockReturnValueOnce(post);
    jest.spyOn(AuthSelector, "loginUser").mockReturnValueOnce(loginUser);
    jest
      .spyOn(helper, "__getRequestOrBorrowShare")
      .mockReturnValueOnce({ userBorrowShare, userRequestShare });
    const props = mapStateToProps(state, ownProps);
    expect(InPostSelector.post).toHaveBeenCalledWith(state, postId);
    expect(AuthSelector.loginUser).toHaveBeenCalledWith(state);
    expect(helper.__getRequestOrBorrowShare).toHaveBeenCalledWith(
      post,
      loginUserId
    );

    expect(props.postId).toBe(postId);
    expect(props.myRequestShareId).toBe(myRequestShareId);
    expect(props.myBorrowShareId).toBe(myBorrowShareId);
  });

  it("can map dispatch to props", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    expect(props).toEqual({});
  });
});
