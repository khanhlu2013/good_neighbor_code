import React from "react";
import { shallow } from "enzyme";
import InPostItemFootBorrow from "../inPostItem_foot_borrow";
import { rawsToPosts } from "../../../../../api/_private_api_helper";
import LoadingIcon from "../../../../../share/loadingIcon";

describe("inPostItem_foot_borrow", () => {
  describe("loading icon", () => {
    it("is display during aware approve", () => {
      const myBorrowShare = getMyApproveShare(false);
      const onAwareApprovePost = jest.fn();
      const onReturnPost = jest.fn();

      const wrap = shallow(
        <InPostItemFootBorrow
          myBorrowShare={myBorrowShare}
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
      const myBorrowShare = getMyApproveShare(true);
      const onAwareApprovePost = jest.fn();
      const onReturnPost = jest.fn();

      const wrap = shallow(
        <InPostItemFootBorrow
          myBorrowShare={myBorrowShare}
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
    const shareId = "shareId1";
    const myBorrowShare = getMyApproveShare(false, shareId);
    const onAwareApprovePost = jest.fn();
    const onReturnPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootBorrow
        myBorrowShare={myBorrowShare}
        isAwaringShare={false}
        isReturningShare={false}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    );
    wrap.find("#outPostItem-awareApproveBtn-react").simulate("click");
    expect(onAwareApprovePost.mock.calls).toHaveLength(1);
    expect(onAwareApprovePost.mock.calls[0][0]).toBe(shareId);

    wrap.find("#outPostItem-returnBtn-react").simulate("click");
    expect(onReturnPost.mock.calls).toHaveLength(1);
    expect(onReturnPost.mock.calls[0][0]).toBe(shareId);
  });

  it("match snapshot", () => {
    const myBorrowShare = getMyApproveShare(false);
    const onAwareApprovePost = jest.fn();
    const onReturnPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootBorrow
        myBorrowShare={myBorrowShare}
        isAwaringShare={false}
        isReturningShare={false}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    );

    expect(wrap).toMatchSnapshot();
  });
});

function getMyApproveShare(
  isAwareApprove,
  shareId = "5be87de80c0c37087779f79e"
) {
  const rawFixture = [
    {
      shares: [
        {
          _id: shareId,
          isAwareApprove: isAwareApprove,
          isReturn: true,
          isAwareReturn: false,
          post: "5be87ddf0c0c37087779f79d",
          borrower: {
            _id: "5be87d7a3ade200000fc9539",
            email: "me@me.com",
            name: "I Myself Me"
          },
          dateCreate: "2018-11-11T19:07:20.808Z",
          __v: 0,
          isApprove: true,
          dateReturn: "2018-11-11T19:07:52.731Z"
        }
      ],
      user: {
        _id: "5be87d7a3ade200000fc9538",
        email: "stranger@person.com",
        name: "Stranger Person"
      },
      post: {
        _id: "5be87ddf0c0c37087779f79d",
        isActive: true,
        user: "5be87d7a3ade200000fc9538",
        title: "stranger",
        description: "stranger",
        dateCreate: "2018-11-11T19:07:11.934Z",
        __v: 0
      }
    }
  ];
  const posts = rawsToPosts(rawFixture);
  return posts[0].shares[0];
}
