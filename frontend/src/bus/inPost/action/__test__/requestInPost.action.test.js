import requestInPost, {
  INFORM_REQUEST_INPOST,
  RECEIVE_REQUEST_INPOST
} from "../requestInPost.action";
import AuthSelector from "@gn/common/app/selector/auth.selector";
import API from "@gn/common/api";

describe("requestInPost action", () => {
  it("work", async () => {
    //setup
    const postId = "postIdFake";
    const dispatch = jest.fn();
    const state = "stateFake";
    const getState = jest.fn().mockReturnValue(state);
    const createShareId = "createShareIdFake";
    const shareDateCreate = "shareDateCreateFake";
    const createShareAPI = jest
      .spyOn(API, "createShare")
      .mockResolvedValueOnce({
        id: createShareId,
        dateCreate: shareDateCreate
      });
    const loginUser = "loginUserFake";
    const loginUserSelector = jest
      .spyOn(AuthSelector, "loginUser")
      .mockReturnValueOnce(loginUser);

    //execute
    const fn = requestInPost(postId);
    await fn(dispatch, getState);

    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: INFORM_REQUEST_INPOST,
      postId
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RECEIVE_REQUEST_INPOST,
      postId,
      shareId: createShareId,
      shareDateCreate: shareDateCreate,
      loginUser: loginUser
    });
    expect(loginUserSelector).toHaveBeenCalledWith(state);
    expect(createShareAPI).toHaveBeenCalledWith(postId);
  });
});
