import {
  mapStateToProps,
  mapDispatchToProps
} from "../inPostItem_foot_request.con";

jest.mock("../../../action/unRequestInPost.action", () => ({
  __esModule: true,
  default: jest.fn()
}));
import unRequestInPost from "../../../action/unRequestInPost.action";
import InPostSelector from "../../../inPost.selector";

describe("inPostItem_foot_request container", () => {
  it("can map state to props", () => {
    const myRequestShareId = "myRequestShareIdStub";
    const ownProps = {
      myRequestShareId
    };
    const isUnRequestingPostResult = "isUnRequestingPostResultStub";
    InPostSelector.isUnRequestingPost = jest.fn();
    InPostSelector.isUnRequestingPost.mockReturnValue(isUnRequestingPostResult);
    const state = "stateStub";
    const props = mapStateToProps(state, ownProps);

    expect(InPostSelector.isUnRequestingPost).toHaveBeenCalledTimes(1);
    expect(InPostSelector.isUnRequestingPost).toHaveBeenCalledWith(state);

    expect(props.myRequestShareId).toBe(myRequestShareId);
    expect(props.isUnRequestingPost).toBe(isUnRequestingPostResult);
  });

  it("can map dispatch to props", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const shareId = "shareIdStub";
    const action = "actionStub";
    unRequestInPost.mockReturnValue(action);

    props.unRequestPostHandler(shareId);
    expect(unRequestInPost).toHaveBeenCalledWith(shareId);
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
