import React from "react";
import { shallow } from "enzyme";
import InPostItemHead from "../inPostItem_head";

describe("inPostItem_head", () => {
  it("when render -> match snapshot", () => {
    const wrap = shallow(
      <InPostItemHead
        postUserName="Lu"
        postUserEmail="abc@efg.com"
        dateCreate={new Date(2000, 1, 1)}
      />
    );

    expect(wrap).toMatchSnapshot();
  });
});
