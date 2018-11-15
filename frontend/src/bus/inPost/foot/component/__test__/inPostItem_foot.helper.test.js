import { rawsToPosts } from "../../../../../api/_private_api_helper";
import { __getRequestOrBorrowShare } from "../inPostItem_foot.helper";

describe("inPostItem_foot helper __getRequestOrBorrowShare", () => {
  it("can return null request share and null borrow share correctly", () => {
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
    const { userRequestShare, userBorrowShare } = __getRequestOrBorrowShare(
      post,
      "userIdStub"
    );
    expect(userRequestShare).toBe(null);
    expect(userBorrowShare).toBe(null);
  });

  it("can return only request share correctly", () => {
    const loginUserId = "5bed0e680b1c1e0000623505";
    const shareId = "5bed125a8c57346a4063160d";
    const fixtures = [
      {
        shares: [
          {
            _id: shareId,
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
    const { userRequestShare, userBorrowShare } = __getRequestOrBorrowShare(
      post,
      loginUserId
    );
    expect(userRequestShare.id).toBe(shareId);
    expect(userBorrowShare).toBe(null);
  });

  it("can return only borrow share correctly", () => {
    const loginUserId = "5bed0e680b1c1e0000623505";
    const shareId = "5bed125a8c57346a4063160d";
    const fixtures = [
      {
        shares: [
          {
            _id: shareId,
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
    const { userRequestShare, userBorrowShare } = __getRequestOrBorrowShare(
      post,
      loginUserId
    );
    expect(userRequestShare).toBe(null);
    expect(userBorrowShare.id).toBe(shareId);
  });
});
