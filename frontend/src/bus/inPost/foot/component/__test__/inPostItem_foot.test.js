import React from "react";
import { shallow } from "enzyme";
import * as helper from "../inPostItem_foot.helper";
import InPostItemFoot from "../inPostItem_foot";
import { rawsToPosts } from "../../../../../api/_private_api_helper";
import InPostItemFootRequestContainer from "../../container/inPostItem_foot_request.con";
import InPostItemFootBorrowContainer from "../../container/inPostItem_foot_borrow.con";

jest.spyOn(helper, "__getRequestOrBorrowShare");

describe("inPostItem_foot", () => {
  it("render non-request and non-approve and non-active post foot correctly", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bed0e680b1c1e0000623503",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bed10308c57346a4063160c",
          isActive: false,
          user: "5bed0e680b1c1e0000623503",
          title: "f",
          description: "f",
          dateCreate: "2018-11-15T06:20:32.940Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const userRequestShare = null;
    const userBorrowShare = null;
    helper.__getRequestOrBorrowShare.mockReturnValueOnce({
      userRequestShare,
      userBorrowShare
    });

    const wrap = shallow(
      <InPostItemFoot post={post} loginUserId={"loginUserIdStub"} />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render non-request and non-approve and active post foot correctly", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bed0e680b1c1e0000623503",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bed10308c57346a4063160c",
          isActive: true,
          user: "5bed0e680b1c1e0000623503",
          title: "f",
          description: "f",
          dateCreate: "2018-11-15T06:20:32.940Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const userRequestShare = null;
    const userBorrowShare = null;
    helper.__getRequestOrBorrowShare.mockReturnValueOnce({
      userRequestShare,
      userBorrowShare
    });

    const wrap = shallow(
      <InPostItemFoot post={post} loginUserId={"loginUserIdStub"} />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render request post foot correctly", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bed0e680b1c1e0000623503",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bed10308c57346a4063160c",
          isActive: true,
          user: "5bed0e680b1c1e0000623503",
          title: "f",
          description: "f",
          dateCreate: "2018-11-15T06:20:32.940Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const userRequestShareId = "5bed125a8c57346a4063160d";
    const userRequestShare = { id: userRequestShareId };
    const userBorrowShare = null;
    helper.__getRequestOrBorrowShare.mockReturnValueOnce({
      userRequestShare,
      userBorrowShare
    });
    const wrap = shallow(
      <InPostItemFoot post={post} loginUserId={"loginUserIdStub"} />
    );
    expect(wrap).toMatchSnapshot();
    expect(
      wrap.find(InPostItemFootRequestContainer).props().myRequestShareId
    ).toBe(userRequestShareId);
  });

  it("render approve post foot correctly", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bed0e680b1c1e0000623503",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bed10308c57346a4063160c",
          isActive: true,
          user: "5bed0e680b1c1e0000623503",
          title: "f",
          description: "f",
          dateCreate: "2018-11-15T06:20:32.940Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const userBorrowShareId = "5bed125a8c57346a4063160d";
    const userRequestShare = null;
    const userBorrowShare = { id: userBorrowShareId };
    helper.__getRequestOrBorrowShare.mockReturnValueOnce({
      userRequestShare,
      userBorrowShare
    });
    const wrap = shallow(
      <InPostItemFoot post={post} loginUserId={"loginUserIdStub"} />
    );
    expect(wrap).toMatchSnapshot();
    expect(
      wrap.find(InPostItemFootBorrowContainer).props().myBorrowShareId
    ).toBe(userBorrowShareId);
  });
});
