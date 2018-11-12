import React from "react";
import { shallow } from "enzyme";
import InPostItemFootApprove from "../inPostItem_foot_approve";
import { rawsToPosts } from "../../../../../api/_private_api_helper";
import LoadingIcon from "../../../../../share/loadingIcon";

describe("inPostItem_foot_approve", () => {
  describe("loading icon", () => {
    it("is display during aware approve", () => {
      const unAwareApproveShare = getMyApproveShare(false);
      const awareApprovePostHandler = jest.fn();
      const returnPostHandler = jest.fn();

      const wrap = shallow(
        <InPostItemFootApprove
          approveShare={unAwareApproveShare}
          isAwaringShare={true}
          isReturningShare={false}
          awareApprovePostHandler={awareApprovePostHandler}
          returnPostHandler={returnPostHandler}
        />
      );
      expect(wrap.find(LoadingIcon).props().text).toBe("aware approve");
      expect(wrap).toMatchSnapshot();
    });

    it("is display during return", () => {
      const approveShare = getMyApproveShare(true);
      const awareApprovePostHandler = jest.fn();
      const returnPostHandler = jest.fn();

      const wrap = shallow(
        <InPostItemFootApprove
          approveShare={approveShare}
          isAwaringShare={false}
          isReturningShare={true}
          awareApprovePostHandler={awareApprovePostHandler}
          returnPostHandler={returnPostHandler}
        />
      );
      expect(wrap.find(LoadingIcon).props().text).toBe("return");
      expect(wrap).toMatchSnapshot();
    });
  });

  it("trigger awareApprovePostHandler and returnPostHandler callback correctly", () => {
    const shareId = "shareId1";
    const approveShare = getMyApproveShare(false, shareId);
    const awareApprovePostHandler = jest.fn();
    const returnPostHandler = jest.fn();

    const wrap = shallow(
      <InPostItemFootApprove
        approveShare={approveShare}
        isAwaringShare={false}
        isReturningShare={false}
        awareApprovePostHandler={awareApprovePostHandler}
        returnPostHandler={returnPostHandler}
      />
    );
    wrap.find("#outPostItem-awareApproveBtn-react").simulate("click");
    expect(awareApprovePostHandler.mock.calls).toHaveLength(1);
    expect(awareApprovePostHandler.mock.calls[0][0]).toBe(shareId);

    wrap.find("#outPostItem-returnBtn-react").simulate("click");
    expect(returnPostHandler.mock.calls).toHaveLength(1);
    expect(returnPostHandler.mock.calls[0][0]).toBe(shareId);
  });

  it("match snapshot", () => {
    const approveShare = getMyApproveShare(false);
    const awareApprovePostHandler = jest.fn();
    const returnPostHandler = jest.fn();

    const wrap = shallow(
      <InPostItemFootApprove
        approveShare={approveShare}
        isAwaringShare={false}
        isReturningShare={false}
        awareApprovePostHandler={awareApprovePostHandler}
        returnPostHandler={returnPostHandler}
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
