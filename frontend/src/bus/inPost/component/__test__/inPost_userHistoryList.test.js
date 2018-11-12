import React from "react";
import { shallow } from "enzyme";

import InPostUserHistoryList from "../inPost_userHistoryList";
import PostListNoData from "../../../post/component/postListNoData";
import { rawsToPosts } from "../../../../api/_private_api_helper";

describe("inPost_userHistoryList", () => {
  it("render empty data correctly", () => {
    const wrap = shallow(<InPostUserHistoryList shares={[]} />);
    expect(wrap).toMatchSnapshot();
    expect(wrap.find(PostListNoData)).toHaveLength(1);
  });

  it("to sort data correctly", () => {
    const before = "2018-11-11T19:07:52.731Z";
    const after = "2018-11-11T19:07:54.392Z";
    let returnToFriendDate;
    let returnToStrangerDate;
    let shares;
    let wrap;

    //friend - before
    returnToFriendDate = before;
    returnToStrangerDate = after;
    shares = create_me_returnBorrowFrom_friendAndStranger_fixture(
      returnToFriendDate,
      returnToStrangerDate
    );
    wrap = shallow(<InPostUserHistoryList shares={shares} />);
    expect(wrap).toMatchSnapshot("friend return before stranger");

    //friend - after
    returnToFriendDate = after;
    returnToStrangerDate = before;
    shares = create_me_returnBorrowFrom_friendAndStranger_fixture(
      returnToFriendDate,
      returnToStrangerDate
    );
    wrap = shallow(<InPostUserHistoryList shares={shares} />);
    expect(wrap).toMatchSnapshot("friend return after stranger");
  });
});

function create_me_returnBorrowFrom_friendAndStranger_fixture(
  friendReturnDateStr,
  strangerReturnDateStr
) {
  const rawFixture = [
    {
      shares: [
        {
          _id: "5be87de80c0c37087779f79e",
          isAwareApprove: true,
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
          dateReturn: strangerReturnDateStr
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
    },
    {
      shares: [
        {
          _id: "5be87dea0c0c37087779f79f",
          isAwareApprove: true,
          isReturn: true,
          isAwareReturn: false,
          post: "5be87dcf0c0c37087779f79c",
          borrower: {
            _id: "5be87d7a3ade200000fc9539",
            email: "me@me.com",
            name: "I Myself Me"
          },
          dateCreate: "2018-11-11T19:07:22.385Z",
          __v: 0,
          isApprove: true,
          dateReturn: friendReturnDateStr
        }
      ],
      user: {
        _id: "5be87d7a3ade200000fc9537",
        email: "my@friend.com",
        name: "My Friend"
      },
      post: {
        _id: "5be87dcf0c0c37087779f79c",
        isActive: true,
        user: "5be87d7a3ade200000fc9537",
        title: "friend",
        description: "friend",
        dateCreate: "2018-11-11T19:06:55.497Z",
        __v: 0
      }
    }
  ];
  const posts = rawsToPosts(rawFixture);
  const [post1, post2] = posts;
  const [share1] = post1.shares;
  const [share2] = post2.shares;
  return [share1, share2];
}
