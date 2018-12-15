import React from "react";
import { shallow } from "enzyme";
import LoadingIcon from "../../../../../share/loadingIcon";
import InPostItemFootBorrowWebView from "../inPostItem_foot_borrow.webView";

describe("inPostItem_foot_borrow", () => {
  describe("loading icon", () => {
    it("is display during aware approve", () => {
      const onAwareApprovePost = jest.fn();
      const onReturnPost = jest.fn();

      const wrap = shallow(
        <InPostItemFootBorrowWebView
          myBorrowShareId={"myBorrowShareIdStub"}
          isAwareApproveBorrowShare={false}
          isAwaringShare={true}
          isReturningShare={false}
          onAwareApprovePost={onAwareApprovePost}
          onReturnPost={onReturnPost}
        />
      );
      expect(wrap.find(LoadingIcon).props().text).toBe("aware approve");
      expect(wrap).toMatchSnapshot();
    });

    it("is display during return", () => {
      const onAwareApprovePost = jest.fn();
      const onReturnPost = jest.fn();

      const wrap = shallow(
        <InPostItemFootBorrowWebView
          myBorrowShareId={"myBorrowShareIdStub"}
          isAwareApproveBorrowShare={true}
          isAwaringShare={false}
          isReturningShare={true}
          onAwareApprovePost={onAwareApprovePost}
          onReturnPost={onReturnPost}
        />
      );
      expect(wrap.find(LoadingIcon).props().text).toBe("return");
      expect(wrap).toMatchSnapshot();
    });
  });

  it("trigger onAwareApprovePost and onReturnPost callback correctly", () => {
    const myBorrowShareId = "myBorrowShareIdStub";
    const onAwareApprovePost = jest.fn();
    const onReturnPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootBorrowWebView
        myBorrowShareId={myBorrowShareId}
        isAwareApproveBorrowShare={false}
        isAwaringShare={false}
        isReturningShare={false}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    );
    wrap.find("#outPostItem-awareApproveBtn-react").simulate("click");
    expect(onAwareApprovePost.mock.calls).toHaveLength(1);
    expect(onAwareApprovePost.mock.calls[0][0]).toBe(myBorrowShareId);

    wrap.find("#outPostItem-returnBtn-react").simulate("click");
    expect(onReturnPost.mock.calls).toHaveLength(1);
    expect(onReturnPost.mock.calls[0][0]).toBe(myBorrowShareId);
  });

  it("match snapshot", () => {
    const onAwareApprovePost = jest.fn();
    const onReturnPost = jest.fn();

    //not yet aware share
    let wrap = shallow(
      <InPostItemFootBorrowWebView
        myBorrowShareId={"myBorrowShareIdStub"}
        isAwareApproveBorrowShare={false}
        isAwaringShare={false}
        isReturningShare={false}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    );
    expect(wrap).toMatchSnapshot("not yet aware share");

    //already awared share
    wrap = shallow(
      <InPostItemFootBorrowWebView
        myBorrowShareId={"myBorrowShareIdStub"}
        isAwareApproveBorrowShare={true}
        isAwaringShare={false}
        isReturningShare={false}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    );
    expect(wrap).toMatchSnapshot("already awared share");
  });
});
