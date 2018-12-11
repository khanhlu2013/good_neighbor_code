import {
  mapStateToProps,
  mapDispatchToProps
} from "../inPostItem_foot_request.con";

import * as UnRequestInPostActionModule from "../../../action/unRequestInPost.action";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

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
    jest.spyOn(UnRequestInPostActionModule, "default");
    UnRequestInPostActionModule.default.mockReturnValueOnce(action);

    props.onUnRequestPost(shareId);
    expect(UnRequestInPostActionModule.default).toHaveBeenCalledWith(shareId);
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
