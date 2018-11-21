import unRequestInPost, {
  INFORM_UNREQUEST_INPOST,
  RECEIVE_UNREQUEST_INPOST
} from "../unRequestInPost.action";
import API from "../../../../api/profile-api";

describe("unRequestInPost action", () => {
  it("works", async () => {
    //setup
    const shareId = "shareIdFake";
    const dispatch = jest.fn();
    const deleteShareAPI = jest
      .spyOn(API, "deleteShare")
      .mockResolvedValueOnce(undefined);

    //execute
    const fn = unRequestInPost(shareId);
    await fn(dispatch);

    //assert
    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: INFORM_UNREQUEST_INPOST,
      shareId
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RECEIVE_UNREQUEST_INPOST,
      shareId
    });
    expect(deleteShareAPI).toHaveBeenCalledWith(shareId);
  });
});
