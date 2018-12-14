import React from "react";
import { shallow } from "enzyme";
import { rawsToPosts } from "../../../../api/_private_api_helper";
import PostItemBodyWebView from "../../view/postItem_body.webView";

describe("postItem_body", () => {
  it("when render post item body -> can match snapshot", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf2104597b7220000dd6bab",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf210765407a8bb7557848b",
          isActive: true,
          user: "5bf2104597b7220000dd6bab",
          title: "post title",
          description: "post description",
          dateCreate: "2018-11-19T01:23:02.405Z",
          __v: 0
        }
      }
    ];

    const [post] = rawsToPosts(fixtures);
    const wrap = shallow(<PostItemBodyWebView post={post} />);
    expect(wrap).toMatchSnapshot();
  });

  it("when render request info -> can match snapshot", () => {
    const fixtures = [
      {
        shares: [
          {
            _id: "5bf211c25407a8bb7557848c",
            isAwareApprove: false,
            isReturn: false,
            isAwareReturn: false,
            post: "5bf210765407a8bb7557848b",
            borrower: {
              _id: "5bf2104597b7220000dd6bad",
              email: "me@me.com",
              name: "I Myself Me"
            },
            dateCreate: "2018-11-19T01:28:34.088Z",
            __v: 0
          }
        ],
        user: {
          _id: "5bf2104597b7220000dd6bab",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf210765407a8bb7557848b",
          isActive: true,
          user: "5bf2104597b7220000dd6bab",
          title: "post title",
          description: "post description",
          dateCreate: "2018-11-19T01:23:02.405Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const wrap = shallow(<PostItemBodyWebView post={post} />);
    expect(wrap).toMatchSnapshot();
  });

  it("when render borrower info -> can match snapshot", () => {
    const fixtures = [
      {
        shares: [
          {
            _id: "5bf211c25407a8bb7557848c",
            isAwareApprove: false,
            isReturn: false,
            isAwareReturn: false,
            post: "5bf210765407a8bb7557848b",
            borrower: {
              _id: "5bf2104597b7220000dd6bad",
              email: "me@me.com",
              name: "I Myself Me"
            },
            dateCreate: "2018-11-19T01:28:34.088Z",
            __v: 0,
            isApprove: true
          }
        ],
        user: {
          _id: "5bf2104597b7220000dd6bab",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf210765407a8bb7557848b",
          isActive: true,
          user: "5bf2104597b7220000dd6bab",
          title: "post title",
          description: "post description",
          dateCreate: "2018-11-19T01:23:02.405Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const wrap = shallow(<PostItemBodyWebView post={post} />);
    expect(wrap).toMatchSnapshot();
  });

  it("when render return info -> can match snapshot", () => {
    const fixtures = [
      {
        shares: [
          {
            _id: "5bf211c25407a8bb7557848c",
            isAwareApprove: true,
            isReturn: true,
            isAwareReturn: false,
            post: "5bf210765407a8bb7557848b",
            borrower: {
              _id: "5bf2104597b7220000dd6bad",
              email: "me@me.com",
              name: "I Myself Me"
            },
            dateCreate: "2018-11-19T01:28:34.088Z",
            __v: 0,
            isApprove: true,
            dateReturn: "2018-11-19T01:31:22.523Z"
          }
        ],
        user: {
          _id: "5bf2104597b7220000dd6bab",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf210765407a8bb7557848b",
          isActive: true,
          user: "5bf2104597b7220000dd6bab",
          title: "post title",
          description: "post description",
          dateCreate: "2018-11-19T01:23:02.405Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const wrap = shallow(<PostItemBodyWebView post={post} />);
    expect(wrap).toMatchSnapshot();
  });
});
