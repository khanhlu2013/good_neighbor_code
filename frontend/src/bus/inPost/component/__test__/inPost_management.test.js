import React from "react";
import { shallow } from "enzyme";
import InPostManagementComponent from "../inPost_management";
import LoadingIcon from "../../../../share/loadingIcon";
import { rawsToPosts } from "../../../../api/_private_api_helper";
import InPostUserHistoryList from "../inPost_userHistoryList";
import InPostList from "../inPostList";
import TabPanel from "../../../../share/style/tabPanel_style";
import InPostTabEnum from "../inPost_tabEnum";

describe("inPost_management component", () => {
  it("on did mount -> can fetch data", () => {
    const fetchInPosts = jest.fn();
    shallow(
      <InPostManagementComponent
        fetchInPosts={fetchInPosts}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    expect(fetchInPosts).toHaveBeenCalledTimes(1);
  });

  it("on render -> can show loading icon during fetching", () => {
    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={true}
        isInitPosts={false}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    expect(wrap.find(LoadingIcon)).toHaveLength(1);
  });

  it("on render -> can show emptiness when not loading and not init posts", () => {
    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={false}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    expect(wrap.find(LoadingIcon)).toHaveLength(0);
    expect(wrap).toMatchSnapshot();
  });

  it("on render -> can show all posts", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf40631236352000018b0eb",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf406545407a8bb75578493",
          isActive: true,
          user: "5bf40631236352000018b0eb",
          title: "p title",
          description: "p description",
          dateCreate: "2018-11-20T13:04:20.390Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);

    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[post]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    const subjectWrap = wrap.find({ listId: "inPostList-all-react" });
    expect(subjectWrap).toHaveLength(1);
    expect(subjectWrap.get(0)).toMatchSnapshot();
  });

  it("on render -> can show request posts", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf40631236352000018b0eb",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf406545407a8bb75578493",
          isActive: true,
          user: "5bf40631236352000018b0eb",
          title: "p title",
          description: "p description",
          dateCreate: "2018-11-20T13:04:20.390Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);

    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[post]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    const subjectWrap = wrap.find({ listId: "inPostList-request-react" });
    expect(subjectWrap).toHaveLength(1);
    expect(subjectWrap.get(0)).toMatchSnapshot();
  });

  it("on render -> can show approve posts", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf40631236352000018b0eb",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf406545407a8bb75578493",
          isActive: true,
          user: "5bf40631236352000018b0eb",
          title: "p title",
          description: "p description",
          dateCreate: "2018-11-20T13:04:20.390Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);

    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[post]}
        returnShares={[]}
      />
    );
    const subjectWrap = wrap.find({ listId: "inPostList-approveNote-react" });
    expect(subjectWrap).toHaveLength(1);
    expect(subjectWrap.get(0)).toMatchSnapshot();
  });

  it("on render -> can show borrow posts", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf40631236352000018b0eb",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf406545407a8bb75578493",
          isActive: true,
          user: "5bf40631236352000018b0eb",
          title: "p title",
          description: "p description",
          dateCreate: "2018-11-20T13:04:20.390Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);

    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[]}
        borrowPosts={[post]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    const subjectWrap = wrap.find({ listId: "inPostList-borrow-react" });
    expect(subjectWrap).toHaveLength(1);
    expect(subjectWrap.get(0)).toMatchSnapshot();
  });

  it("on render -> can show user history list", () => {
    const fixtures = [
      {
        shares: [
          {
            _id: "5bf40b045407a8bb75578494",
            isAwareApprove: true,
            isReturn: true,
            isAwareReturn: false,
            post: "5bf406545407a8bb75578493",
            borrower: {
              _id: "5bf40631236352000018b0ed",
              email: "me@me.com",
              name: "I Myself Me"
            },
            dateCreate: "2018-11-20T13:24:20.555Z",
            __v: 0,
            isApprove: true,
            dateReturn: "2018-11-20T13:24:35.347Z"
          }
        ],
        user: {
          _id: "5bf40631236352000018b0eb",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf406545407a8bb75578493",
          isActive: true,
          user: "5bf40631236352000018b0eb",
          title: "p title",
          description: "p description",
          dateCreate: "2018-11-20T13:04:20.390Z",
          __v: 0
        }
      }
    ];

    const [post] = rawsToPosts(fixtures);
    const [share] = post.shares;

    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[share]}
      />
    );
    const subjectWrap = wrap.find(InPostUserHistoryList);
    expect(subjectWrap).toHaveLength(1);
    expect(subjectWrap.get(0)).toMatchSnapshot();
  });

  it("when render -> can hide/show TabPanel correctly", () => {
    const wrap = shallow(
      <InPostManagementComponent
        fetchInPosts={jest.fn()}
        posts={[]}
        isFetchingPosts={false}
        isInitPosts={true}
        //calculated
        requestPosts={[]}
        borrowPosts={[]}
        approveAlertPosts={[]}
        returnShares={[]}
      />
    );
    const getListIdOfShownTab = wrap => {
      const result = wrap
        .find(TabPanel)
        .find({ show: true })
        .find(InPostList);
      expect(result).toHaveLength(1);

      return result.at(0).prop("listId");
    };

    expect(getListIdOfShownTab(wrap)).toEqual("inPostList-all-react");

    wrap.setState({ selectTab: InPostTabEnum.REQUEST });
    expect(getListIdOfShownTab(wrap)).toEqual("inPostList-request-react");

    wrap.setState({ selectTab: InPostTabEnum.APPROVE });
    expect(getListIdOfShownTab(wrap)).toEqual("inPostList-approveNote-react");

    wrap.setState({ selectTab: InPostTabEnum.BORROW });
    expect(getListIdOfShownTab(wrap)).toEqual("inPostList-borrow-react");

    wrap.setState({ selectTab: InPostTabEnum.HISTORY });
    expect(
      wrap
        .find(TabPanel)
        .find({ show: true })
        .find(InPostUserHistoryList)
    ).toHaveLength(1);
  });
});
