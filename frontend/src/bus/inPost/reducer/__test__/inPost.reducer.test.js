import inPostReducer from "../inPost.reducer";
import informFetchingPosts, {
  INFORM_FETCH_INPOSTS
} from "../../action/fetchInPosts.action";

describe("inPost reducer", () => {
  it("when handle INFORM_FETCH_INPOSTS -> can update state", () => {
    const result = inPostReducer(undefined, { type: INFORM_FETCH_INPOSTS });
    expect(result.isFetchingPosts).toBe(true);
  });

  // it("when handle RECEIVE_FETCH_INPOSTS -> can update state", () => {
  //   const posts = "postsFake";
  //   const result = inPostReducer(undefined, {
  //     type: INFORM_FETCH_INPOSTS,
  //     posts
  //   });
  //   expect(result.posts).toBe(posts);
  // });
});
