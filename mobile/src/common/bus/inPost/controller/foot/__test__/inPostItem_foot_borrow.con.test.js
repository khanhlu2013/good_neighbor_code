import {
  mapStateToProps,
  mapDispatchToProps
} from "../inPostItem_foot_borrow.con";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

import * as AwareApproveInPostActionModule from "../../../action/awareApproveInPost.action";
import * as ReturnInPostActionModule from "../../../action/returnInPost.action";

describe("inPostItem_foot_borrow container", () => {
  it("can map state to props", () => {
    const myBorrowShareId = "myBorrowShareIdStub";
    const ownProps = { myBorrowShareId };
    const isAwareApprove = "isAwareApproveStub";
    const share = { id: myBorrowShareId, isAwareApprove };
    const isAwaringShare = "isAwaringShareStub";
    const isReturningShare = "isReturningShareStub";

    InPostSelector.share = jest.fn().mockReturnValue(share);
    InPostSelector.isAwaringShare = jest.fn().mockReturnValue(isAwaringShare);
    InPostSelector.isReturningShare = jest
      .fn()
      .mockReturnValue(isReturningShare);

    const props = mapStateToProps("stateStub", ownProps);

    expect(props.myBorrowShareId).toBe(myBorrowShareId);
    expect(props.isAwareApproveBorrowShare).toBe(isAwareApprove);
    expect(props.isAwaringShare).toBe(isAwaringShare);
    expect(props.isReturningShare).toBe(isReturningShare);
  });

  it("can map dispatch to props", () => {
    const dispatch = jest.fn();
    const shareId = "shareIdStub";

    //train result
    const awareApproveInPostAction = "awareApproveInPostActionStub";
    jest.spyOn(AwareApproveInPostActionModule, "default");
    AwareApproveInPostActionModule.default.mockReturnValueOnce(
      awareApproveInPostAction
    );

    const returnInPostAction = "returnInPostActionStub";
    jest.spyOn(ReturnInPostActionModule, "default");
    ReturnInPostActionModule.default.mockReturnValueOnce(returnInPostAction);

    //execute subject
    const props = mapDispatchToProps(dispatch);

    //test subject
    props.onAwareApprovePost(shareId);
    expect(dispatch).toHaveBeenCalledWith(awareApproveInPostAction);
    props.onReturnPost(shareId);
    expect(dispatch).toHaveBeenCalledWith(returnInPostAction);
  });
});
