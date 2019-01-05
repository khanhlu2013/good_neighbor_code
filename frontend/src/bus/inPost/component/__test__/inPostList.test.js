import React from "react";
import { shallow } from "enzyme";
import InPostList from "../inPostList";
import { rawsToPosts } from "../../../../api/_private_api_helper";

describe("inPostList", () => {
  it("when render empty data -> can match snapshot", () => {
    const wrap = shallow(<InPostList listId={"listId"} posts={[]} />);
    expect(wrap).toMatchSnapshot();
  });

  it("when render list data -> can match snapshot", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf2141272372400006b4579",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf214825407a8bb75578491",
          isActive: true,
          user: "5bf2141272372400006b4579",
          title: "p2 title",
          description: "p2 description",
          dateCreate: "2018-11-19T01:40:18.758Z",
          __v: 0
        }
      },
      {
        shares: [{}],
        user: {
          _id: "5bf2141272372400006b4579",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf214775407a8bb75578490",
          isActive: true,
          user: "5bf2141272372400006b4579",
          title: "p1 title",
          description: "p1 description",
          dateCreate: "2018-11-19T01:40:07.625Z",
          __v: 0
        }
      }
    ];

    const posts = rawsToPosts(fixtures);
    const wrap = shallow(<InPostList listId={"listId"} posts={posts} />);
    expect(wrap).toMatchSnapshot();
  });
});
