import awareApproveInPost, {
  INFORM_AWARE_APPROVE_INPOST,
  RECEIVE_AWARE_APPROVE_INPOST
} from "../awareApproveInPost.action";
import API from "../../../../api/profile-api";

describe("awareApproveInPost action", () => {
  it("when invoke with shareId -> dispatch inform, call API, then dispatch API resolve result", async () => {
    //setup
    const shareId = "shareIdFake";
    const isAwareApprove = "isAwareApproveFake";
    jest.spyOn(API, "awareApproveShare").mockResolvedValueOnce(isAwareApprove);

    //execute
    const fn = awareApproveInPost(shareId);

    //verify
    const dispatch = jest.fn();
    await fn(dispatch);

    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: INFORM_AWARE_APPROVE_INPOST,
      shareId
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RECEIVE_AWARE_APPROVE_INPOST,
      shareId,
      isAwareApprove
    });
  });
});
