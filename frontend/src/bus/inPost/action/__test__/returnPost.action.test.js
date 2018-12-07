import returnInPost, {
  INFORM_RETURN_INPOST,
  RECEIVE_RETURN_INPOST
} from "../returnInPost.action";
import API from "@gn/common/api";

describe("returnInPost action", () => {
  it("works", async () => {
    //setup
    const shareId = "shareIdFake";
    const dispatch = jest.fn();
    const resultIsReturnByTo = "resultIsReturnByTo";
    const resultDateReturn = "resultDateReturn";
    const returnShareAPI = jest
      .spyOn(API, "returnShare")
      .mockResolvedValueOnce({ resultIsReturnByTo, resultDateReturn });

    //execute
    const fn = returnInPost(shareId);
    await fn(dispatch);

    //assert
    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: INFORM_RETURN_INPOST,
      shareId
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RECEIVE_RETURN_INPOST,
      shareId,
      resultIsReturnByTo,
      resultDateReturn
    });
  });
});
