import {
  mapStateToProps,
  mapDispatchToProps
} from "../inPostItem_foot_borrow.con";
import InPostSelector from "../../../inPost.selector";

jest.mock("../../../action/awareApproveInPost.action", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("../../../action/returnInPost.action", () => ({
  __esModule: true,
  default: jest.fn()
}));

import awareApproveInPost from "../../../action/awareApproveInPost.action";
import returnInPost from "../../../action/returnInPost.action";

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
    awareApproveInPost.mockReturnValue(awareApproveInPostAction);
    const returnInPostAction = "returnInPostActionStub";
    returnInPost.mockReturnValue(returnInPostAction);

    //execute subject
    const props = mapDispatchToProps(dispatch);

    //test subject
    props.onAwareApprovePost(shareId);
    expect(dispatch).toHaveBeenCalledWith(awareApproveInPostAction);
    props.onReturnPost(shareId);
    expect(dispatch).toHaveBeenCalledWith(returnInPostAction);
  });
});
