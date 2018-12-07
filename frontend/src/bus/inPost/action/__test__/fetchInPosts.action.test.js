import fetchInPosts, {
  INFORM_FETCH_INPOSTS,
  RECEIVE_FETCH_INPOSTS
} from "../fetchInPosts.action";
import AuthSelector from "../../../../app/auth.selector";
import API from "@gn/common/api";

describe("fetchInPosts action", () => {
  it("works", async () => {
    //setup
    const userId = "userIdFake";
    jest.spyOn(AuthSelector, "loginUser").mockReturnValueOnce({ id: userId });
    const state = "stateFake";
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);
    const posts = "postsFake";
    jest.spyOn(API, "inPosts").mockResolvedValueOnce(posts);

    //execute
    const fn = fetchInPosts();
    await fn(dispatch, getState);

    //assert
    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: INFORM_FETCH_INPOSTS });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RECEIVE_FETCH_INPOSTS,
      posts,
      loginUserId: userId
    });
  });
});
