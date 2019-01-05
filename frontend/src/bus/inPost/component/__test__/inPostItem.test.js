import React from "react";
import { shallow } from "enzyme";
import { rawsToPosts } from "../../../../api/_private_api_helper";
import { InPostItem } from "../inPostItem";

describe("InPostItem", () => {
  it("when render -> can match snapshot", () => {
    const fixtures = [
      {
        shares: [{}],
        user: {
          _id: "5bf2130ed95b19000076af71",
          email: "my@friend.com",
          name: "My Friend"
        },
        post: {
          _id: "5bf213205407a8bb7557848d",
          isActive: true,
          user: "5bf2130ed95b19000076af71",
          title: "post title",
          description: "post description",
          dateCreate: "2018-11-19T01:34:24.839Z",
          __v: 0
        }
      }
    ];
    const [post] = rawsToPosts(fixtures);
    const wrap = shallow(<InPostItem post={post} />);
    expect(wrap).toMatchSnapshot();
  });
});
