import React from "react";
import { shallow } from "enzyme";
import InPostItemFoot from "../inPostItem_foot";
import { rawsToPosts } from "../../../../../api/_private_api_helper";

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
    const wrap = shallow(<InPostItemFoot post={post} loginUserId={"abc"} />);
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
    const wrap = shallow(<InPostItemFoot post={post} loginUserId={"abc"} />);
    expect(wrap).toMatchSnapshot();
  });

  it("render request post foot correctly", () => {
    const loginUserId = "5bed0e680b1c1e0000623505";
    const fixtures = [
      {
        shares: [
          {
            _id: "5bed125a8c57346a4063160d",
            isAwareApprove: false,
            isReturn: false,
            isAwareReturn: false,
            post: "5bed10308c57346a4063160c",
            borrower: {
              _id: loginUserId,
              email: "me@me.com",
              name: "I Myself Me"
            },
            dateCreate: "2018-11-15T06:29:46.973Z",
            __v: 0
          }
        ],
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
    const wrap = shallow(
      <InPostItemFoot post={post} loginUserId={loginUserId} />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render approve post foot correctly", () => {
    const loginUserId = "5bed0e680b1c1e0000623505";
    const fixtures = [
      {
        shares: [
          {
            _id: "5bed125a8c57346a4063160d",
            isAwareApprove: false,
            isReturn: false,
            isAwareReturn: false,
            post: "5bed10308c57346a4063160c",
            borrower: {
              _id: loginUserId,
              email: "me@me.com",
              name: "I Myself Me"
            },
            dateCreate: "2018-11-15T06:29:46.973Z",
            __v: 0,
            isApprove: true
          }
        ],
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
    const wrap = shallow(
      <InPostItemFoot post={post} loginUserId={loginUserId} />
    );
    expect(wrap).toMatchSnapshot();
  });
});
